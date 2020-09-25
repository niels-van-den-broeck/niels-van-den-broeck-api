import Joi from 'joi';
import Boom from '@hapi/boom';

import BlogPosts from '../../../../models/blogPosts';

import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

interface Headers {
  token: string;
}

type PostBody = {
  title: string;
  post: string;
};

const registerRoute: RouteRegistration = (server) => {
  server.post(
    '/blogposts',
    async (req, res) => {
      const { title, post } = req.body;

      const bp = new BlogPosts({
        title,
        post,
        author: ''
      });

      await bp.save();

      res.send({
        id: bp._id,
        title: bp.title,
        post: bp.post,
      });
    },
  );
};

export default registerRoute;
