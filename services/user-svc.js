const User = require("../models/user");

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