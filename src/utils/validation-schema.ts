import { Joi } from "celebrate";

export const userCreateSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});
