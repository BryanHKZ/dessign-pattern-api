const express = require("express");

const api = express.Router();

const {
  getTicketMessages,
} = require("../../controllers/messageController/getters");
const {
  createTicket,
} = require("../../controllers/messageController/mutations");
const auth = require("../../middleware/auth");

api.get("/messages", auth, getTicketMessages);

api.post("/messages", auth, createTicket);

module.exports = api;
