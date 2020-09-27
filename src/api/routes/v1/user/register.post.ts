import Boom from '@hapi/boom';
import Joi from 'joi';
import crypto from 'crypto';
import passport from 'passport';

import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

import validateRequest from '../../../../middleware/requestValidator';

import User from '../../../../models/User';

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
    .message('Password must contain at least 6 characters and 1 number')
    .required(),
  screenName: Joi.string().min(3).max(20).required(),
});

const registerRoute: RouteRegistration = (router) => {
  router.post('/user/register', validateRequest(validationSchema), async (req, res, next) => {
    try {
      const { email, password, screenName } = req.body;

      const existingUser = await User.findOne({ email }).lean().exec();

      if (existingUser) throw Boom.conflict('User already exists');

      const passwordSalt = crypto.randomBytes(16).toString('hex');
      const passwordHash = User.hashPassword(password, passwordSalt);

      const user = new User({
        email,
        screenName,
        passwordSalt,
        passwordHash,
      });

      await user.save();

      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  });
};

export default registerRoute;
