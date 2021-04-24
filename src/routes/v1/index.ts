import { Router } from "express";
import { userRoutes } from "./user.route";

export const v1Routes = Router();

v1Routes.use("/users", userRoutes);
