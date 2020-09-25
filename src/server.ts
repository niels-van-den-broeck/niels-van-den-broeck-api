import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import buildApp from './app';
import config from './config/env';

import logger from './core/logger';

/**
 * starts the server once connected to mongodb.
 */
async function start() {
  const server = buildApp();

  mongoose.connection.once('open', async (mongoError, db) => {
    if (mongoError) throw mongoError;

    try {
      await server.listen(config.PORT);
      logger.info(`Server running on port: ${config.PORT}`);
    } catch (err) {
      db.close();
      process.exit(1);
    }
  });

  mongoose.connection.on('error', err => {
    if (err.toString().indexOf('ECONNREFUSED') >= 0) {
      process.exit(1);
    }
  });
}

start();
mongoose.connect(config.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
