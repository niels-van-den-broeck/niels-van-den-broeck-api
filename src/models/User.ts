import Mongoose, { Document, MongooseModel } from 'mongoose';

export type UserType = {
  screenName: string;
  email: string;
  passwordHex: string;
  passwordSalt: string;
};

type UserDocument = Document & UserType;

const UserSchema = new Mongoose.Schema({
  screenName: String,
  email: String,
  passwordHex: String,
  passwordSalt: String,
});

export default Mongoose.model<UserDocument, MongooseModel<UserDocument>>('Users', UserSchema);
