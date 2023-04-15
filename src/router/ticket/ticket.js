const express = require("express");

const api = express.Router();

const {
  getAllTickets,
  getTicketById,
  getTicketsCount,
} = require("../../controllers/ticketController/getters");
const {
  updateTicketStatus,
  createTicket,
} = require("../../controllers/ticketController/mutations");
const auth = require("../../middleware/auth");
const { isApiHealthy } = require("../../controllers");

api.get("/health", isApiHealthy);

api.get("/tickets/id/:id", auth, getTicketById);
api.get("/tickets", auth, getAllTickets);
api.get("/tickets/count", auth, getTicketsCount);

api.post("/tickets", auth, createTicket);

api.put("/tickets/id/:id", auth, updateTicketStatus);

module.exports = api;
