/**
 * @fileOverview Main user router.
 */
const to = require('await-to-js').to;

const { verifyToken, validateMovieRequest } = require('../../middleware');
const { movieSvc } = require("../../services");
const router = require("express").Router();

router.get('/', verifyToken, async (req, res) => {
  let [moviesErr, movies] = await to(movieSvc.findMovie({user_id: req.userId}, true, 'findAll', ['id', 'name', 'genre', 'cast', 'rating', 'release_date']));

  if(moviesErr) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get movies'
    })
  }

  res.status(200).json({
    status: 'success',
    data: movies
  })
})

router.put('/', [verifyToken, validateMovieRequest], async (req, res) => {
  let [moviesErr, movies] = await to(movieSvc.updateMovie(req.body.id, {
    name: req.body.name,
    rating: req.body.rating,
    genre: req.body.genre,
    cast: req.body.cast,
    release_date: req.body.releaseDate
  }));

  if(moviesErr) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to update movie'
    })
  }

  res.status(200).json({
    status: 'success'
  })
})

router.delete('/', verifyToken, async(req, res) => {
  let [movieErr, movie] = await to(movieSvc.deleteMovie({id: req.body.id}));

  if(movieErr) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete movie'
    })
  }

  res.status(200).json({
    status: 'success'
  })
})

router.post('/create', [verifyToken, validateMovieRequest], async (req, res) => {
  const {name, rating, cast, genre, releaseDate} = req.body;
  let [createdMovieErr, createdMovie] = await to(movieSvc.createMovie({name, rating, cast, genre, release_date: releaseDate, user_id: req.userId}));

  if(createdMovieErr) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create movie'
    })
  }

  res.status(200).json({
    status: 'success',
    data: createdMovie
  })
})

module.exports = router;