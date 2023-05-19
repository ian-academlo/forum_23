// Router de express
const { Router } = require("express");
const { createUser, login } = require("../controllers/users.controlles");
const { createUserValidator } = require("../validators/user.validators");

const router = Router();

router.post("/users", createUserValidator, createUser);

router.post("/users/login", login);

module.exports = router;
