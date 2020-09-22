export interface Config {
  MONGO_URI: string;
  FIREBASE_SERVICE_ACCOUNT: string;
  FIREBASE_DB_URI: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
}

function getConfig(): Config {
  return {
    MONGO_URI: process.env.MONGO_URI || '',
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT || '',
    FIREBASE_DB_URI: process.env.FIREBASE_DB_URI || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || '',
  };
}

export default getConfig();
