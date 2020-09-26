import Boom from '@hapi/boom';
import express from 'express';

import registerV1Routes from './api/routes/v1';
import errorHandler from './middleware/errorHandler';

export default function buildApp() {
  const app = express();

  app.use(express.json());

  const v1Router = express.Router();
  registerV1Routes(v1Router);

  app.use('/api/v1', v1Router);
  app.use('/api/*', (req, res, next) => next(Boom.notFound('Route does not exist.')));

  app.use(errorHandler);

  return app;
}
