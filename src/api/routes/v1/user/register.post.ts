import Joi from 'joi';

import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

import validateRequest from '../../../../middleware/requestValidator';

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
    .message('Password must contain at least 6 characters and 1 number')
    .required(),
});

const registerRoute: RouteRegistration = (router) => {
  router.post('/user/register', validateRequest(validationSchema), (req, res, next) => {
    res.sendStatus(200);
  });
};

export default registerRoute;
