const objectMapper = require('object-mapper');

const Jobs = require('../../../../models/jobs');

const jobTransform = {
  company: 'company',
  startYear: 'startYear',
  endYear: 'endYear',
  description: 'description',
  technologies: 'technologies',
};

module.exports = function registerRoute(server) {
  server.get('/experience', async (request, reply) => {
    const jobs = await Jobs.find().lean().exec();

    reply.send({
      data: jobs.map((job) => objectMapper(job, jobTransform)),
    });
  });
};
