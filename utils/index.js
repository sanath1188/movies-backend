const config = require("config");
const secretKey = config.get("jwt.secretKey");
const jwt = require('jsonwebtoken');

const generateJWTToken = (userId) => {
  let promise = new Promise(async (resolve, reject) => {
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