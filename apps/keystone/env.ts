import dotenv from "dotenv";

dotenv.config();

// Define environment variables
const NODE_ENV = process.env.NODE_ENV;
const REDIS_URL = process.env.REDIS_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ALLOW_ROLES_MANAGEMENT = process.env.ALLOW_ROLES_MANAGEMENT;
const APP_HOST = process.env.KEYSTONE_APP_HOST;
const KEYSTONE_ENV = process.env.KEYSTONE_ENV;
const KEYSTONE_APP_NAME = process.env.KEYSTONE_APP_NAME;
const DB_ENDPOINT = process.env.DB_ENDPOINT;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const APP_PORT = process.env.APP_PORT || 3000;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Calculate constants
const SITE_URL =
  APP_HOST === "localhost"
    ? `http://${APP_HOST}:${APP_PORT}`
    : `https://${APP_HOST}`;

const DATABASE_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_ENDPOINT}:${DB_PORT}/${DB_NAME}`;

// Export environment variables
export {
  NODE_ENV,
  DATABASE_URL,
  REDIS_URL,
  SESSION_SECRET,
  ALLOW_ROLES_MANAGEMENT,
  APP_HOST,
  APP_PORT,
  KEYSTONE_ENV,
  KEYSTONE_APP_NAME,
};

// Export constants
export { SITE_URL };
