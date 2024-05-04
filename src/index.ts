import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import registerRoutes from "./router";

dotenv.config();

const app: Express = express();
const server = new http.Server(app);

app.use(cors());
registerRoutes(app);

let PORT = process.env.PORT || 4000;

server.listen(PORT, function () {
  console.log(`api rest run on port ${PORT}`);
});
