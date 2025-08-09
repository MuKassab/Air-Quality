import { Router } from 'express';
import httpStatus from 'http-status';
import airQualityRouter from './airQuality/router/airQuality.js';

const { OK } = httpStatus;

const apiRouter = Router();

apiRouter.use('/air-quality', airQualityRouter);

apiRouter.get('/status', (req, res) => {
  res.status(OK).json({
    status: 'System is running',
    timestamp: new Date().toISOString(),
  });
});

export default apiRouter;
