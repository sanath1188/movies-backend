/**
 * @fileoverview Movie model.
 */

const Sequelize = require("sequelize");
const db = require("../config/db");

const Movie = db.define("movie", {
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cast: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  release_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  tableName: "movie"
});

module.exports = Movie;
