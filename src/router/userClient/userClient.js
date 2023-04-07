const express = require("express");

const api = express.Router();

const {
  CreateUser,
  updateUserClient,
} = require("../../controllers/userController/setUserClientControlle");

const {
  getusersClient,
} = require("../../controllers/userController/getUserClientController");

api.post(
  "/userclient",

  CreateUser
);

api.get(
  "/userclient",

  getusersClient
);

api.put("/userclient", updateUserClient);

module.exports = api;
