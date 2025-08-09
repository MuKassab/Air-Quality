import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpecs from '../docs/index.js';

const docsRouter = new Router();

docsRouter.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default docsRouter;
