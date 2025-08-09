import { ERROR_CODES } from '../../../src/common/constants/error-codes.js';
import { AIR_QUALITY_TAG } from '../../tags.js';
import { LatitudeQueryParameter, LongitudeQueryParameter } from '../common/parameters.js';
import {
  CityPollutionResponseSchema,
  CityPollutionValidationErrorResponseSchema,
  ParisMostPollutionResponseSchema,
} from './schemas.js';

const AirQualityDocs = {
  '/air-quality/city-pollution': {
    get: {
      tags: [AIR_QUALITY_TAG],
      summary: 'Get the air poulltion details for a city closest to the given coordinates',

      parameters: [LatitudeQueryParameter, LongitudeQueryParameter],

      responses: {
        200: {
          description: 'Air pollution details returned successfully',
          content: {
            'application/json': {
              schema: CityPollutionResponseSchema,
            },
          },
        },

        400: {
          description: `
          - Bad payload, errorCode: ${ERROR_CODES.QUERY_VALIDATION_FAILED.errorCode}
          - Failure to fetch data given provided coordinates
          `,
          content: {
            'application/json': {
              schema: CityPollutionValidationErrorResponseSchema,
            },
          },
        },
      },
    },
  },

  '/air-quality/paris-most-pollution': {
    get: {
      tags: [AIR_QUALITY_TAG],
      summary: 'Get the max air pollution for Paris based on historical data',

      responses: {
        200: {
          description: `
          - Max air pollution for Paris returned successfully
          `,
          content: {
            'application/json': {
              schema: ParisMostPollutionResponseSchema,
            },
          },
        },
      },
    },
  },
};

export default AirQualityDocs;
