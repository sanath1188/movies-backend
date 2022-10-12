/**
 * @fileoverview User model.
 */

const bcrypt = require("bcrypt-nodejs");
const Sequelize = require("sequelize");
const db = require("../config/db");
const Movie = require("./movie");

const User = db.define("user", {
  first_name: {
    type: Sequelize.STRING(50),

    validate: {
      is: {
        args: [/^([^0-9]*)$/],
        msg: "Please enter a valid first name"
      }
    }
  },
  last_name: {
    type: Sequelize.STRING(50),

    validate: {
      is: {
        args: [/^([^0-9]*)$/],
        msg: "Please enter a valid last name"
      }
    }
  },
  password: {
    type: Sequelize.STRING(100),

    set: function (val) {
      /** Generate salt and hash synchronously to avoid error. */
      var salt = bcrypt.genSaltSync(); // Default number of rounds is 10.
      var hash = bcrypt.hashSync(val, salt);

      this.setDataValue("password", hash);
    }
  },
  email: {
    type: Sequelize.STRING(50),
    unique: true,

    validate: {
      isEmail: { msg: "Enter your email like this: name@example.com" }
    },
    set: function (val) {
      this.setDataValue("email", val.toLowerCase());
    }
  }
}, {
  timestamps: true,
  paranoid: true,
  tableName: "user"
});

User.hasMany(Movie);

module.exports = User;
