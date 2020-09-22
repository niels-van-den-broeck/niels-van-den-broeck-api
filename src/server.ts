import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';

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
