const registerExperienceRoutes = require('./experience');

module.exports = function registerRoutes(server, opts, done) {
  registerExperienceRoutes(server);

  done();
};
