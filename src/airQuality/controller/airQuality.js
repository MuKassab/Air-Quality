import httpStatus from 'http-status';
import { airQualityService } from '../service/index.js';

const { OK } = httpStatus;

export const airQualityController = {
  /**
   * Handles a GET /air-quality/nearest-city request.
   *
   * Gets the air quality for the nearest city based on the provided latitude and longitude.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   *
   * @returns {Promise<void>} Resolves with the response sent
   */
  getAirQualityForNearestCityByCoordinates: async (req, res, next) => {
    try {
      const { query: { latitude, longitude } } = req;

      const result = await airQualityService.getAirQualityForNearestCityByCoordinates({ latitude, longitude });

      return res.status(OK).send({
        status: 'success',
        data: result,
      });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Handles a GET /air-quality/paris-most-pollution request.
   *
   * Gets the maximum air quality for Paris.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   *
   * @returns {Promise<void>} Resolves with the response sent
   */
  getAirQualityForParisMaxPollution: async (req, res, next) => {
    try {
      const result = await airQualityService.getParisMaxPollutionData();

      return res.status(OK).send({
        status: 'success',
        data: result,
      });
    } catch (err) {
      return next(err);
    }
  },
};
