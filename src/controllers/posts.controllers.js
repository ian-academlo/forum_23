const Answers = require("../models/answers.model");
const Posts = require("../models/posts.model");
const Users = require("../models/users.model");

const createPost = async (req, res, next) => {
  try {
    const newPost = req.body;
    await Posts.create(newPost);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const getPostByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const posts = await Posts.findAll({
      where: { categoryId },
      attributes: { exclude: ["description", "categoryId", "userId"] },
      include: {
        model: Users,
        as: "createdBy",
        attributes: ["username", "id"],
      },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostWithAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id, {
      attributes: {
        exclude: ["categoryId", "userId"],
      },
      include: [
        {
          model: Users,
          as: "createdBy",
          attributes: ["id", "username"],
        },
        {
          model: Answers,
          attributes: ["content", "created_at"],
          include: {
            model: Users,
            attributes: ["id", "username"],
          },
        },
      ],
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// crear un handler exclusivo para sequelize

module.exports = {
  createPost,
  getPostByCategory,
  getPostWithAnswer,
};
