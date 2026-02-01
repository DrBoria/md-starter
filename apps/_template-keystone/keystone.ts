import path from "path";
import { config, list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import type { KeystoneContext } from '@keystone-6/core/types';
import { session, withAuth } from "./auth";
import { APP_PORT, DATABASE_URL, APP_HOST } from "./env";
import { lists } from "./schema";
import express from "express";
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
          return `http://${APP_HOST}:${APP_PORT}/files${path}`;
        },
        serverRoute: { path: "/files" },
        storagePath: "public/files", // Path where files will be stored locally
      },
    },
    db: {
      provider: "postgresql",
      url: DATABASE_URL,
      enableLogging: ["error", "warn", "info", 'query'],
    },
    graphql: {
      apolloConfig: {
        allowBatchedHttpRequests: true,
      }
    },
    server: {
      port: Number(APP_PORT),
      extendExpressApp: (app, context: KeystoneContext) => {
        app.use(express.json());
        app.get('/health', async (req, res) => {
          try {
            await context.prisma.$queryRaw`SELECT 1`;
            res.status(200).json({ status: 'ok', message: 'Service is healthy' });
          } catch (error) {
            console.error('Health check failed:', error);
            res.status(500).json({
              status: 'error',
              message: 'Service is unhealthy',
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        });
      },
      cors: {
        origin: true,
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      }
    },
    ui: {
      isAccessAllowed: (context) => !isLocked(context), // Disable admin view if user is locked
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
    telemetry: true,
  }),
);
