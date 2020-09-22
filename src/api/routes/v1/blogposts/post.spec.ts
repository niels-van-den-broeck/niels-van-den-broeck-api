import { ObjectId } from 'mongodb';
import buildApp from '../../../../app';
import mongooseHelpers from '../../../../helpers/mongoose-helpers';
import BlogPosts from '../../../../models/blogPosts';

const app = buildApp();

describe('POST /api/v1/blogposts', () => {
  beforeAll(async () => {
    await mongooseHelpers.connect();
    await mongooseHelpers.dropCollection(BlogPosts);
  });

  afterAll(async () => {
    await mongooseHelpers.disconnect();
  });

  function createBlogPost({ ...params } = {}) {
    return {
      title: 'A whole new world',
      post: '<h2>A brand new place ewksdjfojasdfnkj<h2>',
      ...params,
    };
  }

  function act(blogPost = createBlogPost()) {
    return app.inject({
      method: 'POST',
      url: '/api/v1/blogposts',
      payload: blogPost,
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
        id: expect.any(String),
        title: 'A whole new world',
        post: '<h2>A brand new place ewksdjfojasdfnkj<h2>',
      });
    });

    test('it persist the data', async () => {
      const response = await act();
      const body = response.json();

      const stored = await BlogPosts.findById(body.id)
        .lean()
        .exec();

      expect(stored).toEqual(
        expect.objectContaining({
          _id: new ObjectId(body.id),
          title: body.title,
          post: body.post,
        }),
      );
    });
  });

  describe('HTTP 1.1/400 Bad Request', () => {
    test('it returns the status when title is missing', async () => {
      const response = await act(
        createBlogPost({
          title: null,
        }),
      );
      const body = response.json();

      expect(body).toEqual({
        statusCode: 400,
        error: 'Bad Request',
        message: 'One or more validation failed',
      });
    });

    test('it returns the status when post is missing', async () => {
      const response = await act(
        createBlogPost({
          post: null,
        }),
      );
      const body = response.json();

      expect(body).toEqual({
        statusCode: 400,
        error: 'Bad Request',
        message: 'One or more validation failed',
      });
    });
  });
});
