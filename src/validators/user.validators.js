// check --> verificar/ revisar / chequear / validar
const { check, validationResult } = require("express-validator");

const createUserValidator = [
  check("username", "Error con el campo username")
    .exists()
    .withMessage("Username es obligatorio")
    .notEmpty()
    .withMessage("Username no debe estar vacio")
    .isString()
    .withMessage("El tipo de dato debe ser string")
    .isLength({ min: 6, max: 30 })
    .withMessage("El username debe tener minimo 6 caracteres y máximo 30"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("email es obligatorio")
    .notEmpty()
    .withMessage("email no puede estar vacio")
    .isString()
    .withMessage("email debe ser un string")
    .isEmail()
    .withMessage("email no tiene formato de correo")
    .isLength({ min: 10, max: 50 })
    .withMessage("El email debe tener minimo 10 caracteres y máximo 50"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
];

// object.hasOwnProperty('propertyName')
module.exports = { createUserValidator };
