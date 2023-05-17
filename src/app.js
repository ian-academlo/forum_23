const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const initModels = require("./models/initModels");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");

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

app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// No usuarios que pueden hacer?
// ver - leer
// get todos los posts por categoria
// get un post particular

// crear un post necesita autenticación
// crear una respuesta --> auth

// proteger nuestras rutas
// nos vamos con todo en middlewares
