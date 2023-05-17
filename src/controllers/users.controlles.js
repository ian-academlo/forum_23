const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "you shall not pass",
      });
    }
    const { firstname, lastname, id, username, rolId } = user;

    // no responder la contraseña

    // debemos devolver un token para que el usuario loggeado
    // pueda acceder a los recursos del back

    // Genear token
    const userData = { firstname, lastname, id, username, email, rolId };

    const token = jwt.sign(userData, "parangaricutirimucuaro", {
      algorithm: "HS512",
      expiresIn: "5m",
    });
    // agregar el token en userData
    userData.token = token;

    res.json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createUser,
  login,
};
