/**
 * El código debe tener el prefijo "CSIFY"
 */
const errors = [
  {
    code: "CSIFY5001",
    message: "Ha ocurrido un error en el servidor",
  },
  {
    code: "CSIFY4001",
    message: "Ticket no encontrado",
  },
  {
    code: "CSIFY4002",
    message:
      "El usuario ya tiene un ticket activo, por tanto no puede abrir otro.",
  },
  {
    code: "CSIFY4003",
    message: "El estado del ticket no es válido",
  },
  {
    code: "CSIFY3001",
    message: "El id del ticket es requerido",
  },
  {
    code: "CSIFY3002",
    message: "El mensaje requiere el id del agente.",
  },
  {
    code: "CSIFY3003",
    message: "",
  },
  {
    code: "CSIFY3004",
    message:
      "Debes esperar la respuesta de un agente antes de poder a volver enviar un mensaje",
  },
  {
    code: "CSIFY3005",
    message: "El mensaje requiere un contenido",
  },
];

/**
 * Método para retornar un Objeto de Error por defecto
 *
 * @param {String} code Debe tener un prefijo "CSIFY" acompañado de un número
 * @returns Object | null
 */
const findError = (code = "") => {
  return errors.find((e) => e.code === code);
};

module.exports = {
  findError,
};
