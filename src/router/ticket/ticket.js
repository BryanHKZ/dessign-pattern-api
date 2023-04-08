const express = require("express");

const api = express.Router();
const {
  getAllUserTicket,
  getTicketById,
} = require("../../controllers/ticketController/getters");
const {
  updateTicketStatus,
} = require("../../controllers/ticketController/mutations");
const auth = require("../../middleware/auth");
const { isApiHealthy } = require("../../controllers");

api.get("/health", auth, isApiHealthy);

api.get("/tickets/:id", auth, getTicketById);
api.get("/tickets", auth, getAllUserTicket);
api.put("/tickets/:id", auth, updateTicketStatus);

module.exports = api;
