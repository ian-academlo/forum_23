const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");
const initModels = require("./models/initModels");
const transporter = require("./utils/mailer");

initModels();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Servidor trabajando OK");
});

// agrupar todas las rutas en un archivo
apiRoutes(app);
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Organizar los archivos para empezar con nuestros eps

// TODO les voy a dar las especificacones al estilo de una prueba tecnica

// instalar dbeaver??
