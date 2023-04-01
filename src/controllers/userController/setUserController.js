const prisma = require("../../tools/prisma");
const { hash } = require("bcryptjs");

const CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwords = await hash(password, 10);

    let variable = {
      ...req.body,
      password: passwords,
    };

    console.log(variable);

    const user = await prisma.userAdmi.create({
      data: variable,
    });

    return res.status(200).json({
      user,
      msg: "El usuario ha sido creado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error en el servidor");
  }
};

module.exports = {
  CreateUser,
};
