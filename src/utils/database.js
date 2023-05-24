const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: "localhost",
  port: 5432,
  database: "db_forum_23",
  username: "iannacus",
  password: "root",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
