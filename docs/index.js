import endpointDefinitions from './modules/index.js';

import { AIR_QUALITY_TAG } from './tags.js';

const index = {
  openapi: '3.0.0',

  info: {
    description: 'Documentation of REST API endpoints',
    version: '1.0.0',
    title: 'Air Quality API',
  },

  servers: [{
    url: '/api',
  }],

  tags: [
    {
      name: AIR_QUALITY_TAG,
      description: 'Air Quality Endpoints',
    },
  ],

  paths: endpointDefinitions,
};

export default index;
