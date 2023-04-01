const prisma = require("../../tools/prisma");

const getusersAdmin = async (req, res) => {
  try {
    console.log(req.query);

    const states = status === 1 ? true : false;

    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const Users = await prisma.userAdmi.findMany({
      skip: offset,
      take: limit,
      where: {
        status: states,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        nickName: true,
        email: true,
        phone: true,
        status: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });

    const totalUsers = await prisma.user.count();

    return res
      .status(200)
      .json({ Users, totalPages: Math.ceil(totalUsers / limit) });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error en el servidor");
  }
};

module.exports = {
  getusersAdmin,
};
