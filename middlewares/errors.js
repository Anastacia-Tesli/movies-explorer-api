const DEFAULT_ERROR_MESSAGE = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? DEFAULT_ERROR_MESSAGE : message,
  });
  next();
};
