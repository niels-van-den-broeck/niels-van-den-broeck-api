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
      preValidation: async (req, res, next) => {
        if (!req.headers.token) throw Boom.unauthorized();

        try {
          const res = await server.auth.verifyIdToken(req.headers.token);

          req.user = res;
        } catch (e) {
          if (e.code === 'auth/argument-error') throw Boom.unauthorized();

          throw e;
        }

        next();
      },
    },
    async (req, res) => {
      const { name } = req.user;
      const { title, post } = req.body;

      const bp = new BlogPosts({ title, post, author: name });

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
