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
  {
    code: "LGL3001",
    message: "El id del ticket es requerido",
  },
  {
    code: "LGL3002",
    message: "El mensaje requiere el id del agente.",
  },
  {
    code: "LGL3003",
    message: "",
  },
  {
    code: "LGL3004",
    message:
      "Debes esperar la respuesta de un agente antes de poder a volver enviar un mensaje",
  },
  {
    code: "LGL3005",
    message: "El mensaje requiere un contenido",
  },
];

/**
 * Método para retornar un Objeto de Error por defecto
 *
 * @param {String} code Debe tener un prefijo "LGL" acompañado de un número
 * @returns Object | null
 */
const findError = (code = "") => {
  return errors.find((e) => e.code === code);
};

module.exports = {
  findError,
};
