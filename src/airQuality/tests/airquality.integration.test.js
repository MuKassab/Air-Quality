// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import request from 'supertest';

import { ERROR_CODES } from '../../common/constants/error-codes.js';
import CitiesPollutionTracking from '../model/index.js';
import { CITIES } from '../../common/constants/cities.js';

const { BAD_REQUEST, OK } = httpStatus;

const fakePollutionResponse = {
  timestamp: faker.date.recent(),
  aqius: faker.number.int({ min: 0, max: 500 }),
  mainus: faker.string.sample(),
  aqicn: faker.number.int({ min: 0, max: 500 }),
  maincn: faker.string.sample(),
};

jest.unstable_mockModule('../../common/IQAir/IQAirClient.js', () => ({
  IQAirClient: {
    getAirQualityForNearestCityByCoordinates: jest.fn().mockResolvedValue({
      data: {
        status: 'success',
        data: {
          current: {
            pollution: fakePollutionResponse,
          },
        },
      },
    }),
  },
}));

let app;
beforeAll(async () => {
  // only import app after mocking the IQAirClient
  const appModule = await import('../../app.js');
  app = appModule.default;
});

describe('Air Quality Endpoint Integration Tests', () => {
  describe('GET /api/air-quality/city-pollution', () => {
    it('should return the air quality for the nearest city', async () => {
      const response = await request(app).get('/api/air-quality/city-pollution').query({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      });

      expect(response.status).toBe(OK);
      expect(response.body.data.Pollution.aqius).toBe(fakePollutionResponse.aqius);
      expect(response.body.data.Pollution.aqicn).toBe(fakePollutionResponse.aqicn);
      expect(response.body.data.Pollution.mainus).toBe(fakePollutionResponse.mainus);
      expect(response.body.data.Pollution.maincn).toBe(fakePollutionResponse.maincn);
    });

    it('should return 400 if latitude is not provided', async () => {
      const response = await request(app).get('/api/air-quality/city-pollution').query({
        longitude: faker.location.longitude(),
      });

      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body.message).toBe(ERROR_CODES.QUERY_VALIDATION_FAILED.message);
      expect(response.body.errorCode).toBe(ERROR_CODES.QUERY_VALIDATION_FAILED.errorCode);
    });

    it('should return 400 if longitude is not provided', async () => {
      const response = await request(app).get('/api/air-quality/city-pollution').query({
        latitude: faker.location.latitude(),
      });

      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body.message).toBe(ERROR_CODES.QUERY_VALIDATION_FAILED.message);
      expect(response.body.errorCode).toBe(ERROR_CODES.QUERY_VALIDATION_FAILED.errorCode);
    });
  });

  describe('GET api/air-quality/paris-most-pollution', () => {
    let maxAqius = 0;

    beforeEach(async () => {
      for (let i = 0; i < 10; i += 1) {
        const fakeAqius = faker.number.int({ min: 0, max: 500 });

        maxAqius = Math.max(maxAqius, fakeAqius);

        // eslint-disable-next-line no-await-in-loop
        await CitiesPollutionTracking.create({
          city: CITIES.PARIS,
          aqius: fakeAqius,
          mainus: 'Good',
        });
      }
    });


    it('should return the max air pollution for Paris', async () => {
      const response = await request(app).get('/api/air-quality/paris-most-pollution').query();

      expect(response.status).toBe(OK);
      expect(response.body.data.aqius).toBeGreaterThanOrEqual(maxAqius);
    });
  });
});
