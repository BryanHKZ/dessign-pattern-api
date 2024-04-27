/**
 * El código debe tener el prefijo ""
 */
const errors = [
  {
    code: "5001",
    message: "Ha ocurrido un error en el servidor",
  },
  {
    code: "4001",
    message: "Ticket no encontrado",
  },
  {
    code: "4002",
    message:
      "El usuario ya tiene un ticket activo, por tanto no puede abrir otro.",
  },
  {
    code: "4003",
    message: "El estado del ticket no es válido",
  },
  {
    code: "3001",
    message: "El id del ticket es requerido",
  },
  {
    code: "3002",
    message: "El mensaje requiere el id del agente.",
  },
  {
    code: "3003",
    message: "",
  },
  {
    code: "3004",
    message:
      "Debes esperar la respuesta de un agente antes de poder a volver enviar un mensaje",
  },
  {
    code: "3005",
    message: "El mensaje requiere un contenido",
  },
];

/**
 * Método para retornar un Objeto de Error por defecto
 *
 * @param {String} code Debe tener un prefijo "" acompañado de un número
 * @returns Object | null
 */
const launchException = (code = "") => {
  const error = errors.find((e) => e.code === code);

  if (!error) throw new Error("Error desconocido")

  throw new Error(error.message)
};

module.exports = {
  launchException,
};
