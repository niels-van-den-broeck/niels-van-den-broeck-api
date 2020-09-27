import Mongoose, { Document, MongooseModel } from 'mongoose';

export type UserType = {
  screenName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
};

export type UserDocument = Document & UserType;

const UserSchema = new Mongoose.Schema({
  screenName: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
});

export default Mongoose.model<UserDocument, MongooseModel<UserDocument>>('Users', UserSchema);
