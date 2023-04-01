const registerRoutes = require("./router/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 3000;

// Configurar CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

// Configurar la conexión a la base de datos PostgreSQL con Prisma
const prisma = new PrismaClient();

registerRoutes(app);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
