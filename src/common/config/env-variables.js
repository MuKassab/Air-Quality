import { config as extractEnvironmentVariables } from 'dotenv';

extractEnvironmentVariables();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  REDIS_URI: process.env.REDIS_URI,

  IQAIR_API_BASE_URL: process.env.IQAIR_API_BASE_URL,
  IQAIR_API_KEY: process.env.IQAIR_API_KEY,

  POSTGRES_URI: process.env.POSTGRES_URI,
  POSTGRES_TEST_URI: process.env.POSTGRES_TEST_URI,

  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
};
