const postRoutes = require("./posts.routes");
const userRoutes = require("./users.routes");

// recibe como parametro una instancia de express
const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(postRoutes);
};

module.exports = apiRoutes;
