const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createAnswerValidator = [
  check("content", "Error en el contenido de la respuesta")
    .exists()
    .withMessage("No se esta enviando el contenido de la respuesta")
    .notEmpty()
    .withMessage("El contenido de la respuesta no debe estar vacio")
    .isLength({ min: 10 })
    .withMessage("El contenido debe tener al menos 10 caracteres"),
  check("userId", "Error con el id del usuario").exists().notEmpty().isInt(),
  check("postId", "error con el id de la publicacion")
    .exists()
    .notEmpty()
    .isInt(),
  validateResult,
];

module.exports = {
  createAnswerValidator,
};
