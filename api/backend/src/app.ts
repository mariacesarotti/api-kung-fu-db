import express, { json } from "express";
import router from "./routes/routes";
import cors from "cors";

function createApp() {
  const app = express();

  app.use(json());

  const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));
  app.use("/api", router);
  return app;
}

export default createApp;
