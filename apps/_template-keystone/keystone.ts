
import path from "path";
import * as fs from "fs";
import { config } from "@keystone-6/core";
import type { KeystoneContext } from '@keystone-6/core/types';
import { session, withAuth } from "./auth";
import { APP_PORT, DATABASE_URL, APP_HOST } from "./env";
import { lists } from "./schema";
import express from "express";
import { isBanned } from "./schema/utils/access";

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
      prismaSchemaPath: "schema/schema.prisma",
    },
    graphql: {
      schemaPath: "schema/schema.graphql",
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
      isAccessAllowed: (context) => !isBanned(context),
      getAdditionalFiles: [
        // eslint-disable-next-line @typescript-eslint/require-await
        async () => [
          {
            mode: 'copy',
            inputPath: path.join(process.cwd(), 'next.config.ts'),
            outputPath: 'next.config.ts',
          },
        ],
        () => {
          const localFavicon = path.join(process.cwd(), "public", "favicon.ico");
          const defaultFavicon = path.join(process.cwd(), "../../packages/components/default/common/assets/favicon.ico");
          const inputPath = // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.existsSync(localFavicon) ? localFavicon : defaultFavicon;

          return [
            {
              mode: "copy",
              inputPath,
              outputPath: 'public/favicon.ico',
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
