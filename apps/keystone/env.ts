import dotenv from "dotenv";

dotenv.config();

// Define environment variables
const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL!;
const REDIS_URL = process.env.REDIS_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ALLOW_ROLES_MANAGEMENT = process.env.ALLOW_ROLES_MANAGEMENT;
const HUBSPOT_CLIENT_ID = process.env.KEYSTONE_HUBSPOT_CLIENT_ID;
const HUBSPOT_CLIENT_SECRET = process.env.KEYSTONE_HUBSPOT_CLIENT_SECRET;
const HUBSPOT_SCOPE = process.env.HUBSPOT_SCOPE;
const APP_HOST = process.env.KEYSTONE_APP_HOST;
const TRANSFER_USERS_URL = process.env.TRANSFER_USERS_URL;
const SFTP_ACCESS_KEY_ID = process.env.SFTP_ACCESS_KEY_ID;
const SFTP_SECRET_ACCESS_KEY = process.env.SFTP_SECRET_ACCESS_KEY;
const SFTP_REGION = process.env.SFTP_REGION;
const SFTP_ACCOUNT_ID = process.env.SFTP_ACCOUNT_ID;
const SFTP_SERVER_ID = process.env.SFTP_SERVER_ID;
const KEYSTONE_ENV = process.env.KEYSTONE_ENV;
const KEYSTONE_APP_NAME = process.env.KEYSTONE_APP_NAME;
const SFTP_BUCKET_NAME = process.env.SFTP_BUCKET_NAME;
const SFTP_HOST = process.env.SFTP_HOST;

// Calculate constants
const APP_PORT = 3000;
const SITE_URL =
  APP_HOST === "localhost"
    ? `http://${APP_HOST}:${APP_PORT}`
    : `https://${APP_HOST}`;
const HUBSPOT_REDIRECT_URI = `${SITE_URL}/oauth-hubspot-callback`;

// Export environment variables
export {
  NODE_ENV,
  DATABASE_URL,
  REDIS_URL,
  SESSION_SECRET,
  JWT_SECRET_KEY,
  ALLOW_ROLES_MANAGEMENT,
  HUBSPOT_CLIENT_ID,
  HUBSPOT_CLIENT_SECRET,
  HUBSPOT_SCOPE,
  APP_HOST,
  TRANSFER_USERS_URL,
  SFTP_HOST,
  SFTP_ACCESS_KEY_ID,
  SFTP_SECRET_ACCESS_KEY,
  SFTP_REGION,
  SFTP_ACCOUNT_ID,
  SFTP_SERVER_ID,
  SFTP_BUCKET_NAME,
  KEYSTONE_ENV,
  KEYSTONE_APP_NAME,
};

// Export constants
export { HUBSPOT_REDIRECT_URI, SITE_URL };
