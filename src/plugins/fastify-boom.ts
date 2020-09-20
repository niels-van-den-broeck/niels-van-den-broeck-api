import fp from 'fastify-plugin';
import { FastifyPlugin } from 'fastify';
import { Boom } from '@hapi/boom';

const fastifyErrorPage: FastifyPlugin = (fastify, options, next) => {
  fastify.setErrorHandler(function errorHandler(error, request, reply) {
    if (error instanceof Boom) {
      reply
        .code(error.output.statusCode)
        .type('application/json')
        .headers(error.output.headers)
        .send(error.output.payload)
    } else reply.send(error || new Error(`Got non-error: ${error}`))
  })

  next()
}

export default fp(fastifyErrorPage);