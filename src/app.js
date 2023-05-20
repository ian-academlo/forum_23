const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const initModels = require("./models/initModels");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const logError = require("./middlewares/logError.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const ormErroHandler = require("./middlewares/ormErrorHandler.middleware");

initModels();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;
// ? Si no existe la tabla -> La crea
// * alter: true -> compara tablas y columnas y si encuentra diferencias las modifica
// ! force: true -> borra la información y todas las tablas y las crea de nuevo
db.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Servidor trabajando OK");
});

app.use(postRoutes);
app.use(userRoutes);

app.use(logError); // mostramos el error
app.use(ormErroHandler); // si es error del orm actuamos si no mandamos al general
app.use(errorHandler);

// manejar el 404
app.use("*", (req, res) => {
  res.status(404).json({
    message: "El backend se encuentra trabajando, pronto tendremos esta ruta",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
