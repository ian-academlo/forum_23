const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const initModels = require("./models/initModels");
const Posts = require("./models/posts.model");
const Users = require("./models/users.model");
const Categories = require("./models/categories.model");
const Answers = require("./models/answers.model");

initModels();

const app = express();

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

// obtener una publicación con su categria y el usuario que la creo
// obtener las respuestas de la publicación

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id, {
      attributes: {
        exclude: ["userId", "categoryId"],
      },
      include: [
        {
          model: Users,
          attributes: ["id", "username"],
        },
        {
          model: Categories,
          attributes: ["id", "category"],
        },
        {
          model: Answers,
          // includes anidados
          include: {
            model: Users,

            attributes: ["id", "username"],
          },
        },
      ],
    });
    res.json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
