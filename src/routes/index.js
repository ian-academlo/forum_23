const postRoutes = require("./posts.routes");
const userRoutes = require("./users.routes");
const categoriesRoutes = require("./categories.routes");
const answersRoutes = require("./answers.routes");

// recibe como parametro una instancia de express
const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(postRoutes);
  // TODO una ruta para las categorias
  app.use(categoriesRoutes);
  app.use(answersRoutes);
};

module.exports = apiRoutes;
