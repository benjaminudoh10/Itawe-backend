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

export const bookSchema = Joi.object().keys({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
  pages: Joi.number().min(1).required(),
  language: Joi.string().trim().required(),
  image: Joi.string().trim().required(),
  authorId: Joi.string()
    .guid({ version: "uuidv4" })
    .message("Innvalid author id")
    .required(),
});

export const bookIdSchema = Joi.object().keys({
  bookId: Joi.string()
    .guid({ version: "uuidv4" })
    .message("Invalid book id")
    .required(),
});

export const authorSchema = Joi.object().keys({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
});

export const authorIdSchema = Joi.object().keys({
  authorId: Joi.string()
    .guid({ version: "uuidv4" })
    .message("Invalid author id")
    .required(),
});

export const reviewSchema = Joi.object().keys({
  review: Joi.string().trim().required(),
});
