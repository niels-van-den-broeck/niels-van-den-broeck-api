import Joi from 'joi';

import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

import validateRequest from '../../../../middleware/requestValidator';

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
});

const registerRoute: RouteRegistration = (router) => {
  router.post('/user/register', validateRequest(validationSchema), (req, res, next) => {
    res.sendStatus(200);
  });
};

export default registerRoute;
