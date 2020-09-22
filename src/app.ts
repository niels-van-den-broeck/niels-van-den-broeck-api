import fastify, { FastifyServerOptions } from 'fastify';
import corsPlugin from 'fastify-cors';
import { auth } from 'firebase-admin';
import boomPlugin from './plugins/fastify-boom';
import registerV1Routes from './api/routes/v1';
import Joi from 'joi';
import Boom from '@hapi/boom';
import addFirebaseAuth from './decorators/fastify-firebase-auth';

/**
 * Centralized declaration for all additional request params.
 */
declare module 'fastify' {
  interface FastifyRequest {
    user: auth.DecodedIdToken;
  }
}

export default function buildApp(opts?: FastifyServerOptions) {
  const server = fastify(opts);

  server.register(corsPlugin, {
    origin: true,
  });

  server.register(boomPlugin);
  server.register(registerV1Routes, { prefix: '/api/v1' });

  addFirebaseAuth(server);

  // TODO: Check out how to fix typings for this...
  // TODO: details don't get shown in error payloads ...
  /** @ts-expect-error */
  server.setValidatorCompiler(({ schema, httpPart }) => {
    return (data: unknown) => {
      const result = (schema as Joi.ObjectSchema).validate(data);

      const { error } = result;

      if (error) {
          const details = error.details.map(message => {
              return {
                  key: message.path.join('.'),
                  message: message.message,
              };
          });

          const e = Boom.badRequest('One or more validation failed', details);

          return {
            error: e,
          };
      } else {
        return result;
      }
    };
  });

  return server;
}
