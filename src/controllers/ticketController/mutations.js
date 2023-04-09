const prisma = require("../../tools/prisma");
const { findError } = require("../../utils/errors");

const createTicket = async (req, res) => {
  try {
    const { title, description, idUser } = req.body;

    const hasOpenTicket = await prisma.ticket.findFirst({
      where: {
        idUser,
        status: "open",
      },
    });

    if (hasOpenTicket) return res.status(400).json(findError("LGL4002"));

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        idUser,
      },
    });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json(findError("LGL5001"));
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["open", "close"].includes(status))
      return res.status(400).json(findError("LGL4003"));

    const Ticket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
    });

    if (!Ticket) return res.status(404).json(findError("LGL4001"));

    const updateTicket = await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(findError("LGL5001"));
  }
};

module.exports = {
  updateTicketStatus,
  createTicket,
};
