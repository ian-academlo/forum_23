const postRoutes = require("./posts.routes");
const userRoutes = require("./users.routes");
const categoriesRoutes = require("./categories.routes");
const answersRoutes = require("./answers.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

// recibe como parametro una instancia de express
const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(postRoutes);
  // TODO una ruta para las categorias
  app.use(categoriesRoutes);
  app.use(answersRoutes);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = apiRoutes;
