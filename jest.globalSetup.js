/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import { config } from './src/common/config/env-variables.js';

// import app to ensure the models are registered
// eslint-disable-next-line no-unused-vars
import app from './src/app.js';

import { sequelize } from './src/common/database/db.js';

const ensureTestDatabaseExists = async () => {
  const dbName = config.POSTGRES_TEST_URI.split('/').pop();

  const adminSequelize = new Sequelize('', config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
    host: config.POSTGRES_HOST,
    dialect: 'postgres',
  });

  const result = await adminSequelize.query(
    `SELECT 1 FROM pg_database WHERE datname = '${dbName}';`,
  );
  if (result[0].length === 0) {
    console.log(`Creating test database "${dbName}"`);
    await adminSequelize.query(`CREATE DATABASE "${dbName}";`);
  }

  await adminSequelize.close();
};

export default async function globalSetup() {
  try {
    await ensureTestDatabaseExists();

    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch (err) {
    console.error('Error creating test database:', err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}
