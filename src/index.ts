import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import routes from "./router";

dotenv.config();

const app: Express = express();
const port = 3000;

app.use(cors);
app.use(routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
