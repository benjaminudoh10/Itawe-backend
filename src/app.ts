import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

// import { routes } from './routes';

dotenv.config();

if (!process.env.PORT) {
  console.error("Port info must be set in environment");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());
// app.use(routes);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   handleError(err, res);
// });

app.get("/health", (request: Request, response: Response) => {
  response
    .status(200)
    .json({ message: "Works fine!", headers: request.headers })
    .end();
});

export { app };
