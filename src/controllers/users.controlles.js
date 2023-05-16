const Users = require("../models/users.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    // validar la información
    const { username, email, password } = req.body;
    // asegurarse de que no venga vacia
    if (typeof username !== "string" || !username) {
      return res.status(400).json({
        error: "invalid username",
        message: "Username canot be null or diferent to string",
      });
    }
    if (typeof email !== "string" || !email) {
      return res.status(400).json({
        error: "invalid email",
        message: "email canot be null or diferent to string",
      });
    }
    if (typeof password !== "string" || !password) {
      return res.status(400).json({
        error: "invalid password",
        message: "password canot be null or diferent to string",
      });
    }

    // hasheamos la contraseña
    const hashed = await bcrypt.hash(password, 10);

    await Users.create({ username, email, password: hashed });
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validar que el emial exista y sea string
    // Existe el usuario con email
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      // null -> false niego un falso obtengo un verdadero
      return res.status(400).json({
        error: "Invalid email",
        message: "email not exist",
      });
    }

    // comparar las contraseñas
    console.log(user.password);
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "you shall not pass",
      });
    }
    const { firstname, lastname, id, username, roleId } = user;

    // no responder la contraseña

    res.json({ firstname, lastname, id, email, username, roleId });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createUser,
  login,
};
