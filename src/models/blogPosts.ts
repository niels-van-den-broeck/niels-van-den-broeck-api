import mongoose, { Schema, Document, Model } from 'mongoose';

export type BlogPost = Document & {
  title: string;
  post: string;
  author: string;
};

const schema = new Schema({
  title: String,
  post: String,
  author: String,
});

export default mongoose.model<BlogPost, Model<BlogPost>>('BlogPosts', schema);
