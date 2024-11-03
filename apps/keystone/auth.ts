// Welcome to some authentication for Keystone
//
// This is using @keystone-6/auth to add the following
// - A sign-in page for your Admin UI
// - A cookie-based stateless session strategy
//    - Using a Contacts email as the identifier
//    - 30 day cookie expiration
//
// This file does not configure what Contactss can do, and the default for this starter
// project is to allow anyone - logged-in or not - to do anything.
//
// If you want to prevent random people on the internet from accessing your data,
// you can find out how by reading https://keystonejs.com/docs/guides/auth-and-access-control
//
// If you want to learn more about how our out-of-the-box authentication works, please
// read https://keystonejs.com/docs/apis/auth#authentication-api
import { createAuth } from "@keystone-6/auth";
// see https://keystonejs.com/docs/apis/session for the session docs
import { statelessSessions, storedSessions } from "@keystone-6/core/session";
import { createClient } from "@redis/client";
import type { TSession } from "./types";
import { REDIS_URL, SESSION_SECRET } from "./env";
import type { Context } from '.keystone/types';
import { createdAt } from "./schema/fields/createdAt";

const { OAuth2Client } = require('google-auth-library');
const WebClientId = '219402392863-r749djotop4lrj514evfvpdhr9m575k3.apps.googleusercontent.com';
const googleClient = new OAuth2Client(WebClientId);


export const redis = createClient({
  url: REDIS_URL,
});
redis.on("error", (err) => console.log("Redis Client Error", err));

// statelessSessions uses cookies for session tracking
// these cookies have an expiry, in seconds
// we use an expiry of 30 days for this starter
const sessionMaxAge = 60 * 60 * 24 * 30;

function redisSessionStrategy() {
  // you can find out more at https://keystonejs.com/docs/apis/session#session-api
  return storedSessions<TSession>({
    maxAge: sessionMaxAge,
    secret: SESSION_SECRET,

    store: ({ maxAge }) => ({
      // Session could be TSession or SessionId
      async get(session: string | TSession) {
        let sessionId: string;
        if (typeof session === "string") {
          sessionId = session;
        } else {
          sessionId = session.itemId;
        }

        const result = await redis.get(sessionId);
        console.log(`Redis GET result: ${result}`);
        if (!result) {
          console.log("No session found");
          return;
        }

        return JSON.parse(result) as TSession;
      },

      async set(sessionId, data) {
        // we use redis for our Session data, in JSON
        await redis.setEx(sessionId, maxAge, JSON.stringify(data));
        console.log(`Setting session with ID: ${sessionId}`);
      },

      async delete(sessionId) {
        await redis.del(sessionId);
        console.log(`Deleting session with ID: ${sessionId}`);
      },
    }),
  });
}

const stateless = statelessSessions<TSession>({
  maxAge: sessionMaxAge,
  secret: SESSION_SECRET,
});


const session = {
  async get({ context }: { context: Context }) {
    if (!context.req) return;

    const { idtoken } = context.req.headers;

    if (!idtoken) {
      return stateless.get({ context });
    }

    try {
      // Verify the ID token with Google
      const ticket = await googleClient.verifyIdToken({
        idToken: idtoken,
        audience: WebClientId,
      });

      const payload = ticket.getPayload();
      const userEmail = payload?.email;

      // Check if the user exists in the Keystone database
      let user = await context.db.User.findOne({ where: { email: userEmail } });
      let role = await context.db.Role.findOne({ where: { id: user?.roleId } });

      if (!user) {
        // Optionally, create a new user if they don't exist
        // let defaultRole = await context.db.Role.findOne({ where: { name: 'Viewer' } });
        user = await context.db.User.createOne({ data: { email: userEmail } });
      }

      return {
        listKey: 'User',
        itemId: user.id,
        data: {
          id: user.id,
          createdAt: user.createdAt,
          role: role,
        }
      };
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return null;
    }
  },

  start: stateless.start,
  end: stateless.end,
};

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",

  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData:
    "id createdAt role { id name } locked",
  secretField: "password",

  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["email", "password"],

    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  },
});

export { withAuth, session };
