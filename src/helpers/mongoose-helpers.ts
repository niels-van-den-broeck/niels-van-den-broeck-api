import mongoose, { Model } from 'mongoose';

function getCollectionName(item: mongoose.Model<any> | string): string {
  if (typeof item === 'function' && item.collection) {
    return item.collection.collectionName;
  } else return item as string;
}

function connect() {
  mongoose.models = {};

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

function dropCollection(item: string | Model<any>) {
  return new Promise((resolve, reject) => {

    const collectionName = getCollectionName(item);
    return mongoose.connection.db.collection(collectionName, { strict: true }, (err, result) => {
      if (err) return resolve();

      return result.deleteMany((e: unknown) => (e ? reject(e) : resolve()));
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

function dropCollections(collections: [string]) {
  return Promise.all(collections.map((item) => dropCollection(item)));
}

function disconnect() {
  return mongoose.disconnect();
}

export default {
  connect,
  disconnect,
  dropDb,
  dropCollection,
  dropAllCollections,
  dropCollections,
};
