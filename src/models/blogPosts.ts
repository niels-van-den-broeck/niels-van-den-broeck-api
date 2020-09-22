import mongoose, { Document, Schema } from 'mongoose';

import { MongooseModel } from '../@types/UtilityTypes';

export type BlogPost = {
  title: string;
  post: string;
  author: string;
};

type BlogPostDocument = BlogPost & Document;

type BlogPostModel = MongooseModel<BlogPostDocument> & {
  new (document: BlogPost): BlogPostDocument;
};

const schema = new Schema({
  title: String,
  post: String,
  author: String,
});

export default mongoose.model<BlogPostDocument, BlogPostModel>('BlogPosts', schema);
