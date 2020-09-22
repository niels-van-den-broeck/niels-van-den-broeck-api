import { MongooseModel as Model, Document } from 'mongoose';

export type MongooseModel<T extends Document, QueryHelpers = {}> = Omit<
  Model<T, QueryHelpers>,
  'new'
> & {
  new (item: Omit<T, keyof Document>): T;
};
