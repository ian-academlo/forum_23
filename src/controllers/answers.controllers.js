const Answers = require("../models/answers.model");

const createAnswer = async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateAnswer = async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createAnswer,
  updateAnswer,
};
