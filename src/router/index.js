const user = require("./user/user");

const registerRoutes  = (app) => {
  app.use("/api", user);
};

module.exports = registerRoutes;
