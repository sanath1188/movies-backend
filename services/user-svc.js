const User = require("../models/user");

/**
 * Function that creates a user.
 * @param {Object} userDetails - details of user to be created.
 * @returns - promise with success/error data.
 */
const createUser = async (userDetails) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let createdUser = await User.create(userDetails);

      resolve(createdUser);
    } catch (err) {
      reject(err);
    }
  })

  return promise;
}

/**
 * Function that finds a user.
 * @param {Object} whereObj - query to filter movies from.
 * @param {boolean} raw - if output required is a model object or an array.
 * @param {string} findOption - findAll/findOne
 * @param {array} attributes - column names to fetch
 * @returns - promise with success/error data.
 */
const findUser = async (whereObj, raw, findOption, attributes) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let user = await User[findOption]({
        where: whereObj,
        attributes: attributes,
        raw: raw
      });

      resolve(user);
    } catch (err) {
      reject(err);
    }
  })

  return promise;
}

module.exports = {
  createUser,
  findUser
}