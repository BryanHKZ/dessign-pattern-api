const { equal } = require("assert");
const prisma = require("../../tools/prisma");
const { hash } = require("bcryptjs");

const CreateUser = async (req, res) => {
  try {
    const { identification, email, password } = req.body;

    const validations = await getUsersValidatations(identification, email);

    if (validations > 0) {
      return res.status(403).json({
        msg: `El correo ${email} o el numero de ${identification} ya existe`,
      });
    }

    const passwords = await hash(password, 10);

    let variable = {
      ...req.body,
      password: passwords,
    };

    const user = await prisma.user.create({
      data: variable,
    });

    return res.status(200).json({
      user,
      msg: "El usuario ha sido creado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Hubo un error en el servidor al crear un usuario`,
    });
  }
};

const updateUserClient = async (req, res) => {
  try {
    const { identification, email, password } = req.body;
    const { id } = req.query;

    const validations = await getUsersValidatations(identification, email);

    if (validations > 0) {
      return res.status(403).json({
        msg: `El correo ${email} o el numero de ${identification} ya existe`,
      });
    }

    let passwords;

    if (password) {
      passwords = await hash(password, 10);
    }

    let variable = {
      ...req.body,
      password: passwords,
    };

    const users = await prisma.user.findMany({ where: { id: id } });

    if (!users) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: variable,
    });

    return res.status(200).json({
      msg: `Usuario actualizado correctamente`,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Hubo un error en el servidor al actualizar el usuario`,
    });
  }
};

const getUsersValidatations = async (identification, email) => {
  try {
    const emails = await prisma.user.findMany({
      where: {
        OR: [
          {
            identification: identification,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (emails) return emails.length;
    else 0;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreateUser,
  updateUserClient,
};
