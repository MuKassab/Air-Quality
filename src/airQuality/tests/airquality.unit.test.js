// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';
import CitiesPollutionTracking from '../model/index.js';
import { CITIES } from '../../common/constants/cities.js';


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

let airQualityService;
beforeAll(async () => {
  ({ airQualityService } = await import('../service/airQuality.js'));
});

describe('Air Quality Service Unit Tests', () => {
  describe('getAirQualityForNearestCityByCoordinates', () => {
    it('should return the air quality for the nearest city', async () => {
      const response = await airQualityService.getAirQualityForNearestCityByCoordinates({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      });

      const formattedServiceResponse = {
        Pollution: fakePollutionResponse,
      };

      expect(response).toEqual(formattedServiceResponse);
    });
  });

  describe('getParisMaxPollutionData', () => {
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
      const response = await airQualityService.getParisMaxPollutionData();

      expect(response.aqius).toBeGreaterThanOrEqual(maxAqius);
    });
  });
});
