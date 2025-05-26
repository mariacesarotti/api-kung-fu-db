import "dotenv/config";
import { Express } from "express";
import createApp from "./app";

const app = createApp();
const port = process.env.PORT || 3333;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
