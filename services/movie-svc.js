const Movie = require("../models/movie");
const User = require("../models/movie");

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