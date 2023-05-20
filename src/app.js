const express = require("express");
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");

const app = express();

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
