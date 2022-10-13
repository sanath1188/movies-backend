const config = require("config");
const secretKey = config.get("jwt.secretKey");
const jwt = require('jsonwebtoken');

/**
 * A middleware that validates if the user is authenticated.
 * @param {*} req - request of the API.
 * @param {*} res - response object.
 * @param {*} next - enables next steps if the middleware succeeds.
 * @returns - error response/attaches user data to the request.
 */
const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found in the header'
    })
  };

  jwt.verify(token, secretKey, (err, userId) => {
    if (err) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found'
      });
    }

    req.userId = userId;
    next();
  });
}

/**
 * Middleware that ensures the movie object is organized correctly in the body.
 * @param {*} req - request of the API.
 * @param {*} res - response object.
 * @param {*} next - enables next steps if the middleware succeeds.
 * @returns - error response/attaches altered body to the request.
 */
const validateMovieRequest = (req, res, next) => {
  let {name, genre, rating, cast, releaseDate} = req. body;
  if(!name || !rating || !cast || !genre || !releaseDate) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required details'
    })
  }

  if(Number(rating) <1 || Number(rating) > 5) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid rating'
    })
  }

  /** Makes sure there aren't any trailing commas */
  var castArray = cast.split(",");

  const filteredCast = castArray.filter((item) => {
    if(item && item.trim()) {
      return item;
    }
  });

  req.body.cast = filteredCast.join(',');
  next();
}

module.exports = {
  verifyToken,
  validateMovieRequest
}