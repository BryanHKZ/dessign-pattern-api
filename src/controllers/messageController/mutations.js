const prisma = require("../../tools/prisma");
const { findError } = require("../../utils/errors");

const createTicket = async (req, res) => {
  try {
    const { idAgent, sender, ticketId, content } = req.body;

    if (!idAgent) return res.status(400).json(findError("LGL3002"));
    if (!["agent", "user"].includes(sender))
      return res.status(400).json(findError("LGL3003"));
    if (!content) return res.status(400).json(findError("LGL3005"));
    if (!ticketId) return res.status(400).json(findError("LGL3001"));

    // const userHaveResponse = await prisma.message.findFirst({
    //   where: {
    //     sender: {
    //       not: "user",
    //     },
    //   },
    //   orderBy: {
    //     created_at: "desc",
    //   },
    // });

    const message = await prisma.message.create({
      data: {
        content,
        ticketId,
        sender: sender.toUpperCase(),
        idAgent,
      },
    });

    res.status(200).json(message);

    return res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json(findError("LGL5001"));
  }
};

module.exports = {
  createTicket,
};
