const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const { createAnswerValidator } = require("../validators/answer.validators");
const { createAnswer } = require("../controllers/answers.controllers");

const router = Router();

router.post("/answers", authenticate, createAnswerValidator, createAnswer);

module.exports = router;

// saben como se ve el portafolio de un backend?
