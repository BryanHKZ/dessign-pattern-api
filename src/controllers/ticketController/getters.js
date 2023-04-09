const prisma = require("../../tools/prisma");
const { findError } = require("../../utils/errors");

const getTicketsCount = async (req, res) => {
  let { status, idUser, idAgent } = req.query;

  let where = {};

  if (status) {
    where.status = status;
  }
  if (idUser) {
    where.idUser = idUser;
  }
  if (idAgent) {
    where.idAgent = idAgent;
  }

  try {
    let total = await prisma.ticket.count({ where });
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(500).json(findError("LGL5001"));
  }
};

const getAllTickets = async (req, res) => {
  try {
    let where = {},
      metadata = {};
    let {
      status,
      page = 1,
      limit = 10,
      idUser,
      fields = "",
      order_field = "created_at",
      order_direction = "desc",
    } = req.query;
    const offset = (page - 1) * limit;

    fields = fields.split(",");

    if (status) {
      where.status = status;
    }
    if (idUser) {
      where.idUser = idUser;
    }

    const Tickets = await prisma.ticket.findMany({
      skip: offset,
      take: parseInt(limit),
      where,
      orderBy: {
        [order_field]: order_direction,
      },
      include: {
        messages: fields.includes("messages"),
      },
    });

    let responseObject = { data: Tickets };

    if (fields.includes("metadata")) {
      let total = await prisma.ticket.count({ where });
      metadata = {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      };

      responseObject.metadata = metadata;
    }

    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res.status(500).json(findError("LGL5001"));
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    let { fields = "" } = req.query;

    fields = fields.split(",");

    const Ticket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: fields.includes("messages"),
      },
    });

    if (!Ticket) return res.status(404).json(findError("LGL4001"));

    return res.status(200).json({ data: Ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json(findError("LGL5001"));
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketsCount,
};
