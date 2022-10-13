const Movie = require("../models/movie");
const User = require("../models/movie");

/**
 * Function that creates a movie.
 * @param {Object} movieDetails - details of movie to be created.
 * @returns - promise with success/error data.
 */
const createMovie = async (movieDetails) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let createdMovie = await Movie.create(movieDetails);

      resolve(createdMovie);
    } catch (err) {
      reject(err);
    }
  })

  return promise;
}

/**
 * Function that fetches movies.
 * @param {Object} whereObj - query to filter movies from.
 * @param {boolean} raw - if output required is a model object or an array.
 * @param {string} findOption - findAll/findOne
 * @param {array} attributes - column names to fetch
 * @returns - promise with success/error data.
 */
const findMovie = async (whereObj, raw, findOption, attributes) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let movies = await Movie[findOption]({
        where: whereObj,
        attributes,
        raw: raw
      });

      resolve(movies);
    } catch (err) {
      reject(err);
    }
  })

  return promise;
}

/**
 * Function that updates a movie.
 * @param {number} id - id of movie to be updated.
 * @param {*} updateObj - details to be updated.
 * @returns - promise with success/error data.
 */
const updateMovie = async (id, updateObj) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      await Movie.update(updateObj, {
        where: {
          id: id
        }
      });

      resolve(null);
    } catch (err) {
      reject(err);
    }
  })

  return promise;
}

/**
 * Function that deletes a movie.
 * @param {Object} whereObj - which movie to delete
 * @returns - promise with success/error data.
 */
const deleteMovie = async (whereObj) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      await Movie.destroy({
        where: whereObj
      });

      resolve(null);
    } catch (err) {
      reject(err);
    }
  })

  return promise;
}

module.exports = {
  createMovie,
  findMovie,
  deleteMovie,
  updateMovie
}