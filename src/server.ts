import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';
import admin, { ServiceAccount } from 'firebase-admin';

import buildApp from './app';

import config from './config/env';

/**
 * starts the server once connected to mongodb.
 */
async function start() {  
  const server = buildApp({ logger: true });

  mongoose.connection.once('open', async (mongoError, db) => {
    if (mongoError) throw mongoError;

    try {
      await server.listen(3001);
      
      const serviceAcc = {
        projectId: config.FIREBASE_PROJECT_ID,
        clientEmail: config.FIREBASE_CLIENT_EMAIL,
        privateKey: config.FIREBASE_PRIVATE_KEY,
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAcc as ServiceAccount),
        databaseURL: process.env.FIREBASE_DB_URI,
      });
    } catch (err) {
      server.log.error(err);
      db.close();
      process.exit(1);
    }
  });

  mongoose.connection.on('error', (err) => {
    if (err.toString().indexOf('ECONNREFUSED') >= 0) {
      server.log.error('mongoose could not connect');
      process.exit(1);
    }
  });
}

start();
mongoose.connect(config.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
