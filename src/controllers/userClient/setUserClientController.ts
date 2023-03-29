const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//CreateUSer

const createUser = async (req, res) => {
  try {
    const { email, identification, password } = req.body;

    let variable = {
      email,
      identification,
    };

    const validation = validations(variable);

    console.log(validation);
  } catch (error) {
    console.log(error);
  }
};

const validations = async (variable) => {
  try {
    const res = await prisma.user.findOne({
      where: variable.email,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
