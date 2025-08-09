import { Router } from 'express';
import httpStatus from 'http-status';
import { pollutionRouter } from './airQuality/router/index.js';

const { OK } = httpStatus;

const apiRouter = Router();

apiRouter.use('/air-quality', pollutionRouter);

apiRouter.get('/status', (req, res) => {
  res.status(OK).json({
    status: 'System is running',
    timestamp: new Date().toISOString(),
  });
});

export default apiRouter;
