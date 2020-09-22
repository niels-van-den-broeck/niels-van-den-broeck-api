import { FastifyInstance } from 'fastify';
import admin, { ServiceAccount } from 'firebase-admin';

import config from '../config/env';

/**
 * add auth to server instance typings
 */
declare module 'fastify' {
  export interface FastifyInstance {
    auth: admin.auth.Auth;
  }
}

/**
 * @description adds the firebase authentication module to fastify.
 * @param app The server instance
 */
const addFirebaseAuth = (app: FastifyInstance) => {
  const serviceAcc = {
    projectId: config.FIREBASE_PROJECT_ID,
    clientEmail: config.FIREBASE_CLIENT_EMAIL,
    privateKey: config.FIREBASE_PRIVATE_KEY,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAcc as ServiceAccount),
    databaseURL: process.env.FIREBASE_DB_URI,
  });

  app.decorate('auth', admin.auth());
};

export default addFirebaseAuth;
