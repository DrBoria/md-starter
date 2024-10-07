import dotenv from "dotenv";

dotenv.config();

// Define environment variables
const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL!;
const REDIS_URL = process.env.REDIS_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ALLOW_ROLES_MANAGEMENT = process.env.ALLOW_ROLES_MANAGEMENT;
const APP_HOST = process.env.KEYSTONE_APP_HOST;
const KEYSTONE_ENV = process.env.KEYSTONE_ENV;
const KEYSTONE_APP_NAME = process.env.KEYSTONE_APP_NAME;

// Calculate constants
const APP_PORT = 3000;
const SITE_URL =
  APP_HOST === "localhost"
    ? `http://${APP_HOST}:${APP_PORT}`
    : `https://${APP_HOST}`;

// Export environment variables
export {
  NODE_ENV,
  DATABASE_URL,
  REDIS_URL,
  SESSION_SECRET,
  ALLOW_ROLES_MANAGEMENT,
  APP_HOST,
  KEYSTONE_ENV,
  KEYSTONE_APP_NAME,
};

// Export constants
export { SITE_URL };
