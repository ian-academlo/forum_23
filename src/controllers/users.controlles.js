const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await Users.create({ username, email, password: hashed });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      // null -> false niego un falso obtengo un verdadero
      return next({
        status: 400,
        name: "Invalid email",
        message: "user not exist",
      });
    }

    // comparar las contraseñas
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return next({
        status: 400,
        name: "Invalid password",
        message: "The password does not match with user email",
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
    next(error);
  }
};

module.exports = {
  createUser,
  login,
};
