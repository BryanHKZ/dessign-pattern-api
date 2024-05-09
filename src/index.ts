import cors from "cors";
import express, { Express } from "express";
import http from "http";
import registerRoutes from "./router";
import { initEnvironmentVariables } from "./utils";

initEnvironmentVariables();

const app: Express = express();
const server = new http.Server(app);

app.use(cors());
app.use(express.json()); //Add it first then others follw
app.use(express.urlencoded({ extended: true }));
registerRoutes(app);

let PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log(`api rest run on port ${PORT}`);
});
