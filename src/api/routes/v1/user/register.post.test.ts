import request from 'supertest';

import buildApp from '../../../../app';
import mongooseHelpers from '../../../../helpers/mongoose-helpers';
import User from '../../../../models/User';

type RegisterUserResouce = {
  email: string;
  password: string;
  screenName: string;
};

describe('POST /api/v1/user/register', () => {
  const EXISTING_USER_EMAIL = 'existing@test.be';

  const app = buildApp();

  beforeAll(async () => {
    await mongooseHelpers.connect();
  });

  beforeEach(async () => {
    await mongooseHelpers.dropCollection(User);
  });

  beforeEach(async () => {
    const existingUser = new User({
      email: EXISTING_USER_EMAIL,
      screenName: 'ExistingUser',
    });

    await existingUser.save();
  });

  afterAll(async () => {
    await mongooseHelpers.disconnect();
  });

  function createResource({
    email = 'niels@test.be',
    password = 'verysecure001',
    screenName = 'Niels',
  }: Partial<RegisterUserResouce> = {}): Partial<RegisterUserResouce> {
    return {
      email,
      password,
      screenName,
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

    test('it returns the status if no screenName is given', async () => {
      const resource = createResource();
      delete resource.screenName;

      await act(resource).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [{ key: 'screenName', message: '"screenName" is required' }],
      });
    });

    test('it returns the status if screenName is shorter than 3 characters', async () => {
      await act(createResource({ screenName: 'ye' })).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [
          { key: 'screenName', message: '"screenName" length must be at least 3 characters long' },
        ],
      });
    });

    test('it returns the status if screenName is longer than 20 characters', async () => {
      await act(createResource({ screenName: 'nielsnielsnielsnielsoops' })).expect(400, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: [
          {
            key: 'screenName',
            message: '"screenName" length must be less than or equal to 20 characters long',
          },
        ],
      });
    });
  });

  describe('HTTP 1.1/409 Conflict', () => {
    test('it returns the status if user for given email already exists', async () => {
      await act(createResource({ email: EXISTING_USER_EMAIL })).expect(409, {
        statusCode: 409,
        error: 'Conflict',
        message: 'User already exists',
      });
    });
  });
});
