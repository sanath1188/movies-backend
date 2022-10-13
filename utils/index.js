const config = require("config");
const secretKey = config.get("jwt.secretKey");
const jwt = require('jsonwebtoken');

/**
 * Function that signs a jwt token.
 * @param {number} userId - id of user to sign token for.
 * @returns - returns token or error details.
 */
const generateJWTToken = (userId) => {
  let promise = new Promise(async (resolve, reject) => {
    /** Can also add a timestamp that autoexpires after a few minutes/hours/days.
     * Just keeping it simple for now.
     */
    jwt.sign(userId.toString(), secretKey, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    })
  })

  return promise;
}

module.exports = {
  generateJWTToken
}