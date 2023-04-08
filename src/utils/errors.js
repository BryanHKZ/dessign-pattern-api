/**
 * El código debe tener el prefijo "LGL"
 */
const errors = [
  {
    code: "LGL5001",
    message: "Ha ocurrido un error en el servidor",
  },
  {
    code: "LGL4001",
    message: "Ticket no encontrado",
  },
  {
    code: "LGL4002",
    message:
      "El usuario ya tiene un ticket activo, por tanto no puede abrir otro.",
  },
  {
    code: "LGL4003",
    message: "El estado del ticket no es válido",
  },
];

/**
 * Método para retornar un Objeto de Error por defecto
 *
 * @param {String} code Debe tener un prefijo "LGL" acompañado de un número
 * @returns Object | null
 */
const findError = (code = "") => {
  let error = errors.find((e) => e.code === code);

  if (error) {
    error = { ...error };

    delete error.httpStatus;

    return error;
  }

  return null;
};

module.exports = {
  findError,
};
