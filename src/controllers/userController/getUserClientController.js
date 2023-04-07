const prisma = require("../../tools/prisma");

const getusersClient = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const Users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      where: {
        status: status,
      },
    });

    const totalUsers = await prisma.user.count();

    return res
      .status(200)
      .json({ Users, totalPages: Math.ceil(totalUsers / limit) });
  } catch (error) {
    return res.status(500).json({
      msg: `Hubo un error en el servidor al obtener todos los usuarios`,
    });
  }
};

module.exports = {
  getusersClient,
};
