import { config as extractEnvironmentVariables } from 'dotenv';

extractEnvironmentVariables();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  REDIS_URI: process.env.REDIS_URI,

  AIR_QUALITY_API_KEY: process.env.AIR_QUALITY_API_KEY,
};
