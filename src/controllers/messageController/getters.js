const prisma = require("../../tools/prisma");
const { findError } = require("../../utils/errors");

const getTicketMessages = async (req, res) => {
  let { idTicket, fields } = req.query;

  if (!idTicket) return res.status(400).json(findError("LGL3001"));
  try {
    const messages = await prisma.message.findMany({
      where: {
        ticketId: idTicket,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    let responseObject = { data: messages };

    if (fields.includes("metadata")) {
      let total = await prisma.message.count({ ticketId: idTicket });
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
    return res.status(500).json(findError("LGL5001"));
  }
};

module.exports = {
  getTicketMessages,
};
