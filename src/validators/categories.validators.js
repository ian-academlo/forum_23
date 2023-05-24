const { check } = require("express-validator");
const validateResults = require("../utils/validate");

const createCategoriesValidator = [
  check("category", "Errores de categorias")
    .exists()
    .withMessage("No se enta enviando la categoria")
    .notEmpty()
    .withMessage("El nombre de la categoria no puede estar vacio")
    .isString()
    .withMessage("La categoria debe ser un texto")
    .isLength({ min: 7, max: 50 })
    .withMessage(
      "El nombre de la categoria debe ser min de 7 caracteres y max de 50"
    ),
  check("description", "errores en la descripción")
    .exists()
    .withMessage("No se esta enviando la descripción de la categoria")
    .notEmpty()
    .withMessage("La descripción no puede esta vacia")
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener minimo 10 caracteres"),
  validateResults,
];

module.exports = {
  createCategoriesValidator,
};
