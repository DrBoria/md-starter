import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { OAuth2Client } from "google-auth-library";
import { SESSION_SECRET } from "./schema/env";
import type { KeystoneContext } from "@keystone-6/core/types";

const WebClientId = '219402392863-r749djotop4lrj514evfvpdhr9m575k3.apps.googleusercontent.com';
const googleClient = new OAuth2Client(WebClientId);

// statelessSessions uses cookies for session tracking
// these cookies have an expiry, in seconds
// we use an expiry of 30 days for this starter
const sessionMaxAge = 60 * 60 * 24 * 30;

const sessionStrategy = statelessSessions({
  maxAge: sessionMaxAge,
  secret: SESSION_SECRET,
});

const session = {
  async get({ context }: { context: KeystoneContext }) {
    if (!context.req) return;

    const { idtoken } = context.req.headers;

    if (!idtoken) {
      return sessionStrategy.get({ context });
    }

    try {
      // Verify the ID token with Google
      const ticket = await googleClient.verifyIdToken({
        idToken: idtoken as string,
        audience: WebClientId,
      });

      const payload = ticket.getPayload();
      const userEmail = payload?.email;

      // Check if the user exists in the Keystone database
      let user = await context.db.User.findOne({ where: { email: userEmail as string } });
      const role = await context.db.Role.findOne({ where: { id: user?.roleId as string } });

      if (!user) {
        // Optionally, create a new user if they don't exist
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

  start: sessionStrategy.start,
  end: sessionStrategy.end,
};

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",

  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData:
    "id createdAt role { id name }",
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
