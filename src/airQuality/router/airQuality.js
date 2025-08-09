import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { airQualityValidationSchema } from '../validation/index.js';
import { getAirQualityController } from '../controller/index.js';

const router = Router();

router.get(
  '/nearest-city',
  validate(airQualityValidationSchema.getAirQualityForNearestCityByCoordinates),
  getAirQualityController.getAirQualityForNearestCityByCoordinates,
);

export default router;
