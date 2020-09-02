const fastify = require('fastify');

const registerV1Routes = require('./api/routes/v1');

module.exports = function buildApp(opts) {
  const server = fastify(opts);

  server.register(registerV1Routes, { prefix: '/api/v1' });

  return server;
};
