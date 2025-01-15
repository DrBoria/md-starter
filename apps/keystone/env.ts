import dotenv from "dotenv";
// import AWS from "aws-sdk";
// import { Signer } from "@aws-sdk/rds-signer";

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
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PASSWORD_2 = process.env.DB_PASSWORD_2;
const DB_PASSWORD_3 = process.env.DB_PASSWORD_3;

console.log("Current Environment Variables:");
console.log("REDIS_URL:", process.env.REDIS_URL);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Calculate constants
const APP_PORT = 80;
const SITE_URL =
  APP_HOST === "localhost"
    ? `http://${APP_HOST}:${APP_PORT}`
    : `https://${APP_HOST}`;


// // Укажите регион, где находится ваш секрет
// AWS.config.update({ region: 'eu-central-1' });

// // Создаем клиент для работы с Secrets Manager
// const secretsManager = new AWS.SecretsManager();

// // Имя вашего секрета
// const secretName = 'pgdbmd-connection-info';

// // Функция для получения значения секрета
// async function getSecret() {
//   try {
//    // Retrieve the secret value from Secrets Manager
//     const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    
//     let secretValue;
    
//     if (data.SecretString) {
//       // If the secret is stored as a string
//       secretValue = JSON.parse(data.SecretString);
//     } else {
//       // If the secret is stored as binary data
//       const decodedBinarySecret = Buffer.from(data.SecretBinary, 'base64').toString('ascii');
//       secretValue = JSON.parse(decodedBinarySecret);
//     }

//     // Extract connection parameters
//     const { hostname, port, username, database } = secretValue;

//     // Generate IAM auth token for the database
//     const signer = new Signer({
//       region: 'eu-central-1',  // Your region
//       hostname: hostname,
//       port: port,
//       username: username,
//     });

//     // Generate the IAM authentication token
//     const token = await signer.getAuthToken();

//     // Form the DATABASE_URL using the auth token
//     DATABASE_URL = `postgres://${username}:${encodeURIComponent(token)}@${hostname}:${port}/${database}?ssl=require`;
//     console.log(DATABASE_URL)
//     // Output the DATABASE_URL

//   } catch (err) {
//     console.error('Error retrieving secret or generating DB auth token:', err);
//   }
// }

// // Запускаем функцию
// getSecret();

const DATABASE_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_ENDPOINT}:${DB_PORT}/${DB_NAME}`;

console.log('DATABASE_URL :  ', DATABASE_URL);
console.log('DB_PASSWORD :  ', DB_PASSWORD);
console.log('DB_PASSWORD_2 :  ', DB_PASSWORD_2);
console.log('DB_PASSWORD_3 :  ', DB_PASSWORD_3);

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
