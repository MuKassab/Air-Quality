import { IQAirClient } from '../../common/IQAir/IQAirClient.js';
import { IQAirUtilities } from '../../common/IQAir/IQAirUtilities.js';


export const airQualityService = {
  /**
   * Retrieves the air quality for the nearest city using the provided latitude and longitude.
   * @param {Object} coordinates - The coordinates for which to retrieve air quality data.
   * @param {number} coordinates.latitude - The latitude of the location.
   * @param {number} coordinates.longitude - The longitude of the location.
   * @returns {Promise<Object>} The formatted air quality data for the nearest city.
   */
  getAirQualityForNearestCityByCoordinates: async ({ latitude, longitude }) => {
    const IQAirResponse = await IQAirClient.getAirQualityForNearestCityByCoordinates({ latitude, longitude });

    const airQualityData = IQAirUtilities.extractAirQualityDataFromResponse(IQAirResponse);

    const formattedResponse = {
      Pollution: airQualityData.pollution,
    };

    return formattedResponse;
  },
};
