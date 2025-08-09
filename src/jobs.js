import { saveParisPollutionStateJob } from './airQuality/cron/saveParisPollutionData.js';

export const cronjobs = [
  saveParisPollutionStateJob,
];
