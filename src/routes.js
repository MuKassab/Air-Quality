import { Router } from 'express';
import httpStatus from 'http-status';

const { OK } = httpStatus;

const apiRouter = Router();

apiRouter.get('/status', (req, res) => {
  res.status(OK).json({
    status: 'System is running',
    timestamp: new Date().toISOString(),
  });
});

export default apiRouter;
