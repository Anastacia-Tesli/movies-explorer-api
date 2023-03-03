const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  CREATED_CODE,
  NOT_FOUND_MOVIE_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
} = require('../utils/constants');
const { IncorrectError, ForbiddenError, NotFoundError } = require('../errors/index');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED_CODE).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(INCORRECT_ERROR_MESSAGE));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
      return res.send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectError(INCORRECT_ERROR_MESSAGE));
      }
      return next(err);
    });
};
