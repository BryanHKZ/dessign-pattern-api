const express = require("express");

const api = express.Router();
const {
  CreateUser,
} = require("../../controllers/userController/setUserController");

const {
  getusersAdmin,
} = require("../../controllers/userController/getUserController");

api.post(
  "/user",

  CreateUser
);

api.get("/user", getusersAdmin);

module.exports = api;
