const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');
const { UnauthorizedError } = require('../errors/index');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secretkeyfrommesto',
    );
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload;

  next();
};
