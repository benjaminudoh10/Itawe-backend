import jwt from "jsonwebtoken";
import { User } from "../models/User.entity";

export function buildJWT(user: User) {
  const { id, email, role } = user;
  const fields = {
    id,
    email,
    role,
  };
  return jwt.sign(fields, process.env.SECRET_TOKEN as string, {
    expiresIn: '24h',
  });
}
