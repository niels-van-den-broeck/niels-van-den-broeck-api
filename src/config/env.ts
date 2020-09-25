export interface Config {
  MONGO_URI: string;
  LOG_LEVEL: string;
  PORT: string;
}

function getConfig(): Config {
  return {
    MONGO_URI: process.env.MONGO_URI || '',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    PORT: process.env.PORT || '3001',
  };
}

export default getConfig();
