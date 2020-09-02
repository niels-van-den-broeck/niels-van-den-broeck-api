const mongoose = require('mongoose');

function isMongooseModel(item) {
  return typeof item === 'function' && item.name === 'model';
}

function connect() {
  mongoose.models = {};
  mongoose.modelSchemas = {};

  return mongoose.connect('mongodb://localhost:27017/niels-van-den-broeck-test', {
    useNewUrlParser: true,
    autoIndex: true, // make sure the tests are using indexes on the documents
    useCreateIndex: false,
    useFindAndModify: false,
  });
}

function dropDb() {
  return mongoose.connection.dropDatabase();
}

function dropCollection(item) {
  return new Promise((resolve, reject) => {
    const collectionName = isMongooseModel(item) ? item.collection.collectionName : item;
    return mongoose.connection.db.collection(collectionName, { strict: true }, (err, result) => {
      if (err) return resolve();

      return result.removeMany((e) => (e ? reject(e) : resolve()));
    });
  });
}

async function dropAllCollections() {
  const collections = await mongoose.connection.db.listCollections().toArray();

  return Promise.all(
    collections
      .filter((x) => x.name.indexOf('system.') === -1)
      .map((collection) => dropCollection(collection.name)),
  );
}

function dropCollections(collections) {
  return Promise.all(collections.map((item) => dropCollection(item)));
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
  dropDb,
  dropCollection,
  dropAllCollections,
  dropCollections,
};
