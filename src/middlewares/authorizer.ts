import { NextFunction, Request, Response } from "express";
import { buildResponse } from "../utils/helpers";
import { JWTUser } from "../utils/JWTUser";

export const checkAdmin = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const user = response.locals.user as JWTUser;
  if (!user.isAdmin()) {
    return buildResponse(403, false, null, "User is not an admin");
  }
  next();
};
