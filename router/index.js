const routes = require("./routes");
const apiRoutes = require("./apiRoute");

const initRoutes = (app) => {
  app.use("/", routes);
  app.use("/", apiRoutes);
};

module.exports = initRoutes;
