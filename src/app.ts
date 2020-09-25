import express from 'express';

import registerV1Routes from './api/routes/v1';

export default function buildApp() {
  const app = express();
  app.use(express.json());

  const v1Router = express.Router();

  app.use('/api/v1', v1Router);
  registerV1Routes(v1Router);

  return app;
}
