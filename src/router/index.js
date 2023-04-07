const user = require("./user/user");
const userclient = require("./userClient/userClient")

const registerRoutes  = (app) => {
  app.use("/api", user);
  app.use("/api", userclient);
};

module.exports = registerRoutes;
