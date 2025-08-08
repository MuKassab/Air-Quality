import { config } from './common/config/index.js';
import { getHTTPServer } from './server.js';


process.on(
  'uncaughtException',
  // eslint-disable-next-line no-console
  err => console.error(err),
);

const startServer = async () => {
  try {
    // Initialize and run server
    const server = getHTTPServer();
    server.listen(config.PORT);

    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${config.PORT}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Failed to authenticate connection with database', err);
    throw err;
  }
};

startServer();
