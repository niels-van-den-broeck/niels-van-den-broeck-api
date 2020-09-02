const buildApp = require('../../../../app');
const mongooseHelpers = require('../../../../../test/mongoose-helpers');
const Jobs = require('../../../../models/jobs');

const app = buildApp();

describe('GET /api/v1/experience', () => {
  beforeAll(async () => {
    await mongooseHelpers.connect();
    await mongooseHelpers.dropCollection(Jobs);
  });

  beforeAll(async () => {
    const job = new Jobs({
      company: 'Some company',
      endYear: 2020,
      description: 'Fullstack Javascript Developer',
      startYear: 2017,
      technologies: [
        'CircleJerking',
      ],
    });

    await job.save();
  });

  afterAll(async () => {
    await mongooseHelpers.disconnect();
  });

  async function act() {
    return app.inject({
      method: 'GET',
      url: '/api/v1/experience',
    });
  }

  describe('HTTP 1.1/200 OK', () => {
    test('it returns the correct status', async () => {
      const response = await act();
      expect(response.statusCode).toBe(200);
    });

    test('it returns the correct data', async () => {
      const response = await act();
      const body = response.json();

      expect(body).toEqual({
        data: [{
          company: 'Some company',
          endYear: 2020,
          description: 'Fullstack Javascript Developer',
          startYear: 2017,
          technologies: [
            'CircleJerking',
          ],
        }],
      });
    });
  });
});
