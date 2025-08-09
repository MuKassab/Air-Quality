import { CronJob } from 'cron';

import { CITY_COORDINATES } from '../../common/constants/cityCoordinates.js';
import { airQualityService } from '../service/airQuality.js';
import { CITIES } from '../../common/constants/cities.js';
import CitiesPollutionTracking from '../model/index.js';


// Runs once every minute
export const saveParisPollutionStateJob = new CronJob('* * * * *', async () => {
  const startTime = new Date();

  // eslint-disable-next-line no-console
  console.log(`saveParisPollutionDataStateJob - started at ${startTime}`);

  const pollutionData = await airQualityService.getAirQualityForNearestCityByCoordinates({
    latitude: CITY_COORDINATES.PARIS.latitude,
    longitude: CITY_COORDINATES.PARIS.longitude,
  });

  const { Pollution: { aqius, mainus } } = pollutionData;

  const dbRow = {
    city: CITIES.PARIS,
    aqius,
    mainus,
  };

  await CitiesPollutionTracking.create(dbRow);

  const finishTime = new Date();

  // eslint-disable-next-line no-console
  console.log(`saveParisPollutionDataStateJob - finished at ${finishTime} - duration: ${finishTime - startTime}ms`);
});
