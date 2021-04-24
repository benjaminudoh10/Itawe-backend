import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { buildResponse } from "../utils/helpers";
import { JWTUser } from "../utils/JWTUser";

export function validateJWT(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.headers["authorization"];
  if (token?.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  if (!token) {
    return response
      .status(401)
      .json(
        buildResponse(401, false, null, "Authentication token is required")
      );
  }

  try {
    let decodedToken = jwt.verify(token, process.env.SECRET_TOKEN as string);
    if (!decodedToken) {
      return response
        .status(403)
        .json(buildResponse(403, false, null, "Request is forbidden [1]"));
    }
    response.locals.user = new JWTUser(decodedToken);
    next();
  } catch (error) {
    console.log(error);
    return response
      .status(403)
      .json(buildResponse(403, false, null, "Request is forbidden [2]"));
  }
}

export const checkAdmin = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const user = response.locals.user as JWTUser;
  if (!user.isAdmin()) {
    const data = buildResponse(403, false, null, "User is not an admin");
    return response.status(403).json(data).end();
  }
  next();
};
