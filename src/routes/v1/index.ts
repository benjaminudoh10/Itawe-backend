import { Router } from "express";
import { validateJWT } from "../../middlewares/authorizer";
import { bookRoutes } from "./book.route";
import { userRoutes } from "./user.route";

export const v1Routes = Router();

v1Routes.use("/users", userRoutes);
v1Routes.use("/books", validateJWT, bookRoutes);
