import express, { json, NextFunction, Request, Response } from "express";
import router from "./routes/routes";
import cors from "cors";
import { badRequest, serverError } from "./utils/http-helper";

function createApp() {
  const app = express();

  app.use(json());

  const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));
  app.use("/api", router);

  // malformed JSON bodies arrive here with status 400
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const response = error?.status === 400 ? badRequest() : serverError(error);
    res.status(response.statusCode).json(response.body);
  });
  return app;
}

export default createApp;
