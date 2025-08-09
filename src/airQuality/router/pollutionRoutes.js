import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { airQualityValidationSchema } from '../validation/index.js';
import { airQualityController } from '../controller/index.js';

const router = Router();

router.get(
  '/city-pollution',
  validate(airQualityValidationSchema.getAirQualityForNearestCityByCoordinates),
  airQualityController.getAirQualityForNearestCityByCoordinates,
);

router.get(
  '/paris-most-pollution',
  airQualityController.getAirQualityForParisMaxPollution,
);

export default router;
