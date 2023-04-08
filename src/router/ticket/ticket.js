const express = require("express");

const { check } = require("express-validator");

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

api.get("/health", auth, isApiHealthy);

api.get("/tickets/id/:id", auth, getTicketById);
api.get("/tickets", auth, getAllTickets);
api.get("/tickets/count", auth, getTicketsCount);

api.post(
  "/tickets",
  auth,
  [
    check("title", "El título del ticket es obligatorio.").not().isEmpty(),
    check("idUser", "El id del usuario es obligatorio.").not().isEmpty(),
  ],
  createTicket
);

api.put("/tickets/id/:id", auth, updateTicketStatus);

module.exports = api;
