const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API REST con Prisma, Express y Node.js");
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
