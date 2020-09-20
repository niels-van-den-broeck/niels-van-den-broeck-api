import Joi from 'joi';

import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';
import BlogPosts from '../../../../models/blogPosts';

interface Headers {
  token: string;
}

type PostBody = {
  title: string;
  post: string;
};

const registerRoute: RouteRegistration = (server) => {
  server.post<{
    Headers: Headers;
    Body: PostBody;
  }>(
    '/blogposts',
    {
      schema: {
        body: Joi.object()
          .keys({
            title: Joi.string().required(),
            post: Joi.string().required(),
          })
          .required(),
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              author: { type: 'string' },
              post: { type: 'string' },
            },
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
              statusCode: { type: 'number' },
            },
          },
        },
      },
    },
    async (req, res) => {
      // if (!req.headers.token) throw Boom.unauthorized();

      // await admin.auth().verifyIdToken(req.headers.token);

      const { title, post } = req.body;

      const bp = new BlogPosts({ title, post });

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
