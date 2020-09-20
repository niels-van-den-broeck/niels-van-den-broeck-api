import registerBlogPostRoutes from './blogposts';
import { FastifyPluginCallback } from 'fastify';

const registerRoutes: FastifyPluginCallback = (server, opts, done) => {
  registerBlogPostRoutes(server);
  done();
};

export default registerRoutes;