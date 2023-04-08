const prisma = require("../../tools/prisma");

const getAllUserTicket = async (req, res) => {
  try {
    let where = {};
    const { status, page = 1, limit = 10, idUser, idAgent } = req.query;
    const offset = (page - 1) * limit;

    if (status) {
      where.status = status;
    }
    if (idUser) {
      where.idUser = idUser;
    }
    if (idAgent) {
      where.idAgent = idAgent;
    }

    const Tickets = await prisma.ticket.findMany({
      skip: offset,
      take: limit,
      where,
    });

    const totalTickets = await prisma.ticket.count();

    return res
      .status(200)
      .json({ Tickets, totalPages: Math.ceil(totalTickets / limit) });
  } catch (error) {
    return res.status(500).json({
      msg: `Hubo un error en el servidor al obtener todos los tickets`,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.query;

    console.log(id);
  } catch (error) {
    return res.status(500).json({
      msg: `Hubo un error en el servidor al obtener el ticket`,
    });
  }
};

module.exports = {
  getAllUserTicket,
  getTicketById,
};
