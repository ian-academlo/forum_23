const Posts = require("../models/posts.model");

const createPost = async (req, res, next) => {
  try {
    const newPost = req.body;
    await Posts.create(newPost);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

// crear un handler exclusivo para sequelize

module.exports = {
  createPost,
};
