import Boom from '@hapi/boom';
import { RequestHandler } from 'express';
import Joi from 'joi';

export default function validateRequest(schema: Joi.Schema) {
  const validateRequestBody: RequestHandler = (req, res, next) => {
    const { body } = req;
    const { error, value } = schema.validate(body);

    if (error) {
      const details = error.details.map((message) => {
        return {
          key: message.path.join('.'),
          message: message.message,
        };
      });

      return res.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Request body is not valid',
        data: details,
      });
    }

    req.body = value;
    return next();
  };

  return validateRequestBody;
}
