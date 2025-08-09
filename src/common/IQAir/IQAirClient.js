import httpStatus from 'http-status';
import { config } from '../config/index.js';
import { ERROR_CODES } from '../constants/error-codes.js';
import CustomAPIError from '../lib/custom-api-error.js';
import Requester from '../lib/requester.js';

const { BAD_REQUEST } = httpStatus;

const IQAirRequester = new Requester(config.IQAIR_API_BASE_URL, {});

export const IQAirClient = {
  /**
   * Fetches the air quality data for the nearest city based on provided coordinates.
   *
   * Makes an API request to the IQAir service to retrieve air quality information
   * for the nearest city using the specified latitude and longitude.
   *
   * @param {Object} coordinates - The coordinates for which to retrieve air quality data.
   * @param {number} coordinates.latitude - The latitude of the location.
   * @param {number} coordinates.longitude - The longitude of the location.
   *
   * @returns {Promise<Object>} The response from the IQAir API containing air quality data.
   *
   * @throws {CustomAPIError} If the request to the IQAir API fails, an error is thrown
   * containing error details and the appropriate status code.
   */

  getAirQualityForNearestCityByCoordinates: async ({ latitude, longitude }) => {
    try {
      const req = IQAirRequester.on('/nearest_city').injectQueryParam('key', config.IQAIR_API_KEY);

      req.injectQueryParam('lat', latitude);
      req.injectQueryParam('lon', longitude);

      const response = await req.get();

      return response;
    } catch (error) {
      throw new CustomAPIError({
        message: ERROR_CODES.AIR_QUALITY_API_ERROR.message,
        errorCode: ERROR_CODES.AIR_QUALITY_API_ERROR.errorCode,
        status: error.status || BAD_REQUEST,
        meta: {
          error: error.data,
        },
      });
    }
  },
};
