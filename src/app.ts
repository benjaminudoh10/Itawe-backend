import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";
import bodyParser from "body-parser";
import { errors } from "celebrate";

dotenv.config();

if (!process.env.PORT) {
  console.error("Port info must be set in environment");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.text());

app.use(router);

app.get("/health", (request: Request, response: Response) => {
  response
    .status(200)
    .json({ message: "Works fine!", headers: request.headers })
    .end();
});

app.disable("x-powered-by");
app.use(errors());

export { app };
