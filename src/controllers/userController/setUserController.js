const prisma = require("../../tools/prisma");
const { hash } = require("bcryptjs");

const CreateUser = async (req, res) => {
  try {
    const { nickName, email, password } = req.body;

    console.log(nickName);

    const validations = await getUsersValidatations(nickName, email);

    if (validations > 0) {
      return res.status(403).json({
        msg: `El correo ${email} o el nombre de usuario ${nickName} ya existe`,
      });
    }

    const passwords = await hash(password, 10);

    let variable = {
      ...req.body,
      password: passwords,
    };

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

const getUsersValidatations = async (nickName, email) => {
  const emails = await prisma.userAdmi.findMany({
    where: {
      OR: [
        {
          nickName: nickName,
        },
        {
          email: email,
        },
      ],
    },
  });

  if (emails) return emails.length;
  else 0;
};
