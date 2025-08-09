import { CITIES } from '../../common/constants/cities.js';
import { IQAirClient } from '../../common/IQAir/IQAirClient.js';
import { IQAirUtilities } from '../../common/IQAir/IQAirUtilities.js';
import CitiesPollutionTracking from '../model/index.js';


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

  getParisMaxPollutionData: async () => {
    const parisMaxPollutionData = await CitiesPollutionTracking.findOne({
      where: {
        city: CITIES.PARIS,
      },
      order: [
        ['aqius', 'DESC'],
      ],
      limit: 1,
      raw: true,
      attributes: ['aqius', 'mainus', 'createdAt'],
    });

    const formattedResponse = {
      aqius: parisMaxPollutionData?.aqius,
      mainus: parisMaxPollutionData?.mainus,
      timestamp: parisMaxPollutionData?.createdAt,
    };

    return formattedResponse;
  },
};
