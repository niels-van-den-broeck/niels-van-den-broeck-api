import Mongoose, { Document, MongooseModel } from 'mongoose';

type UserType = Document & {
  screenName: string;
  email: string;
  passwordHex: string;
  passwordSalt: string;
};

const UserSchema = new Mongoose.Schema({
  screenName: String,
  email: String,
  passwordHex: String,
  passwordSalt: String,
});

export default Mongoose.model<UserType, MongooseModel<UserType>>('Users', UserSchema);
