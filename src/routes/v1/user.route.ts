import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import UserService from "../../services/user.service";
import {
  userCreateSchema,
  userLoginSchema,
} from "../../utils/validation-schema";

export const userRoutes = Router();

userRoutes.post(
  "/register",
  celebrate({ body: userCreateSchema }),
  async (request: Request, response: Response) => {
    const { body } = request;
    const user = await new UserService().createUser(body);
    return response.status(200).json(user).end();
  }
);

userRoutes.post(
  "/login",
  celebrate({ body: userLoginSchema }),
  async (request: Request, response: Response) => {
    const { body } = request;
    const jwt = await new UserService().loginUser(body);
    return response.status(200).json(jwt).end();
  }
);
