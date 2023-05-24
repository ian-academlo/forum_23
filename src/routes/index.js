const postRoutes = require("./posts.routes");
const userRoutes = require("./users.routes");
const categoriesRoutes = require("./categories.routes");

// recibe como parametro una instancia de express
const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(postRoutes);
  // TODO una ruta para las categorias
  app.use(categoriesRoutes);
};

module.exports = apiRoutes;
