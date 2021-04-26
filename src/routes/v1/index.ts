import { Router } from "express";
import { checkAdmin, validateJWT } from "../../middlewares/authorizer";
import { authorRoutes } from "./author.route";
import { bookRoutes } from "./book.route";
import { userRoutes } from "./user.route";
import { voucherRoutes } from "./voucher.route";

export const v1Routes = Router();

v1Routes.use("/users", userRoutes);
v1Routes.use("/books", validateJWT, bookRoutes);
v1Routes.use("/authors", validateJWT, authorRoutes);
v1Routes.use("/vouchers", validateJWT, checkAdmin, voucherRoutes);
