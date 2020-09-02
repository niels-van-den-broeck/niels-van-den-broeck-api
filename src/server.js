require('dotenv').config();

const mongoose = require('mongoose');

const buildApp = require('./app');

const { MONGO_URI } = process.env;

/**
 * starts the server once connected to mongodb.
 */
async function start() {
  const server = buildApp({ logger: true });

  mongoose.connection.once('open', async (mongoError, db) => {
    if (mongoError) throw mongoError;
    try {
      await server.listen(3000);

      server.log.info(`server listening on ${server.server.address().address}`);
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
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
