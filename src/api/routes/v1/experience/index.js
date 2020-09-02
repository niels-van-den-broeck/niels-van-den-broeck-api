const registerGetRoute = require('./get');

module.exports = function registerRoutes(server) {
  registerGetRoute(server);
};
