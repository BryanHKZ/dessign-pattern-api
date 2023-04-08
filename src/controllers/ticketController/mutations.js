const prisma = require("../../tools/prisma");
const { hash } = require("bcryptjs");

const updateTicketStatus = async (req, res) => {
  try {
    const { idTicket } = req.query;
    const { status } = req.body;

    console.log(idTicket, status);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error en el servidor");
  }
};

module.exports = {
  updateTicketStatus,
};
