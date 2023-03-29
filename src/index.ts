const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dotenv = require ("dotenv")
const bodyParser = require("body-parser");


const prisma = new PrismaClient();




const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("API REST con Prisma, Express y Node.js");
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
