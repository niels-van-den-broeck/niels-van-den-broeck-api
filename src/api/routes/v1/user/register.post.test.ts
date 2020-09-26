import request from 'supertest';

import buildApp from '../../../../app';

type RegisterUserResouce = {
  email: string;
  password: string;
};

describe('POST /api/v1/user/register', () => {
  const app = buildApp();

  function createResource({
    email = 'niels@test.be',
    password = 'verysecure001',
  }: Partial<RegisterUserResouce> = {}): Partial<RegisterUserResouce> {
    return {
      email,
      password,
    };
  }

  function act(resource = createResource()) {
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
      const resource = createResource();
      delete resource.email;

      await act(resource).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [{ key: 'email', message: '"email" is required' }],
      });
    });

    test('it returns the status if user did not provide a valid password', async () => {
      const resource = createResource();
      delete resource.password;

      await act(resource).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [{ key: 'password', message: '"password" is required' }],
      });
    });

    test('it returns the status if password does not contain a number', async () => {
      await act(createResource({ password: 'notsecure' })).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [
          { key: 'password', message: 'Password must contain at least 6 characters and 1 number' },
        ],
      });
    });

    test('it returns the status if password is shorter than 6 characters', async () => {
      await act(createResource({ password: 'nots1' })).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [
          { key: 'password', message: 'Password must contain at least 6 characters and 1 number' },
        ],
      });
    });
  });
});
