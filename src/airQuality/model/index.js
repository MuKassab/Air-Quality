import { sequelize } from '../../common/database/db.js';
import { CITIES_POLLUTION_TRACKING_MODEL_NAME, CITIES_POLLUTION_TRACKING_TABLE_NAME } from './constants.js';
import { CitiesPollutionTrackingSchema } from './schema.js';

const CitiesPollutionTracking = sequelize.define(
  CITIES_POLLUTION_TRACKING_MODEL_NAME,
  CitiesPollutionTrackingSchema,
  {
    tableName: CITIES_POLLUTION_TRACKING_TABLE_NAME,
    indexes: [
      {
        fields: ['city', 'aqius'],
      },
    ],
  },
);

export default CitiesPollutionTracking;
