'use strict';

const Joi = require('joi');

const userValidation = data => {
  const userShema = Joi.object({
    email: Joi.string().pattern(new RegExp('gmail.com')).email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
    age: Joi.number(),
    name: Joi.string(),
    phoneNumber: Joi.string(),
    displayName: Joi.string()
  });

  return userShema.validate(data);
}

const loginValidation = data => {
  const userShema = Joi.object({
    email: Joi.string().pattern(new RegExp('gmail.com')).email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return userShema.validate(data);
}

module.exports = {
  userValidation,
  loginValidation
}
