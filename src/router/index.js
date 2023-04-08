const ticket = require("./ticket/ticket");

const registerRoutes = (app) => {
  app.use(process.env.API_DEFAULT_ROUTE, ticket);
};

module.exports = registerRoutes;
