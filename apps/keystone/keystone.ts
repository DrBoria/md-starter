// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import path from "path";
import { config, graphql } from "@keystone-6/core";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { redis, session, withAuth } from "./auth";
import { DATABASE_URL, NODE_ENV } from "./env";
// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";
import { isLocked } from "./schema/access-control/isLocked";

export default withAuth(
  config({
    storage: {
      my_file_storage: {
        kind: "local", // or 's3' for S3
        type: "file", // or 'image' for image files

        /*******************************/
        /* Local storage configuration */
        /*******************************/
        generateUrl: (path: string) => {
          return `http://localhost:3000/files${path}`;
        },
        serverRoute: { path: "/files" },
        storagePath: "public/files", // Path where files will be stored locally

        /****************************/
        /* S3 storage configuration */
        /****************************/

        // bucketName: process.env.S3_BUCKET_NAME,
        // region: process.env.S3_REGION,
        // accessKeyId: process.env.S3_ACCESS_KEY_ID,
        // secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    },

    db: {
      provider: "postgresql",
      url: DATABASE_URL,
      enableLogging: ["error", "warn"],
      async onConnect() {
        if (NODE_ENV !== "development") {
          console.log("Connected to the database");
          await redis.connect();
        }
      },
    },
    graphql: {
      // Set these fields to false to disable the playground and docs
      playground: true,
      apolloConfig: {
        introspection: true,
      },
    },
    ui: {
      isAccessAllowed: (data) => !isLocked(data), // Disable admin view if user is locked
      getAdditionalFiles: [
        () => {
          return [
            {
              mode: "copy",
              inputPath: path.join(__dirname, "..", "public", "favicon.ico"), // Path relative to current file
              outputPath: "public/favicon.ico", // Output in the 'public' directory
            },
          ];
        },
      ],
    },
    lists,
    session,
    telemetry: false,
  }),
);
