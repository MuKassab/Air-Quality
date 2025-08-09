/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: [
    'jest-extended/all',
  ],
  transform: {

  },
  globalSetup: './jest.globalSetup.js',
};

module.exports = config;
