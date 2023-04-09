const ticket = require("./ticket/ticket");
const message = require("./message/message");

const registerRoutes = (app) => {
  app.use(process.env.API_DEFAULT_ROUTE, ticket);
  app.use(process.env.API_DEFAULT_ROUTE, message);
};

module.exports = registerRoutes;
