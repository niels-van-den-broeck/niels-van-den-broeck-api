import request from 'supertest';

import buildApp from '../../../../app';

type RegisterUserResouce = {
  email: string;
};

describe('POST /api/v1/user/register', () => {
  const app = buildApp();

  function createResource({ email = 'niels@test.be' }: Partial<RegisterUserResouce> = {}) {
    return {
      email,
    };
  }

  function act(resource = {}) {
    const req = request(app).post('/api/v1/user/register').send(resource);

    return req;
  }

  describe('HTTP 1.1/200 OK', () => {
    test('it returns the status', async () => {
      await act(createResource()).expect(200);
    });
  });

  describe('HTTP 1.1/400 Bad Request', () => {
    test('it returns the status if user did not provide a valid email address', async () => {
      await act().expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [{ key: 'email', message: '"email" is required' }],
      });
    });
  });
});
