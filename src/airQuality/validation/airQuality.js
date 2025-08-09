import Joi from 'joi';

export const airQualityValidationSchema = {
  getAirQualityForNearestCityByCoordinates: {
    query: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }).required(),
  },
};
