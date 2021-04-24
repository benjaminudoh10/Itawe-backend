import { Router } from "express";
import { v1Routes } from "./v1";

export const router = Router();

router.use("/v1", v1Routes);
