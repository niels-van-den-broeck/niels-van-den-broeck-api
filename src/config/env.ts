export interface Config {
  MONGO_URI: string;
}

function getConfig(): Config {
  return {
    MONGO_URI: process.env.MONGO_URI || '',
  };
}

export default getConfig();
