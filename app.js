require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limit');
const router = require('./routes/index');
const { handleError } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DEV, JWT_SECRET_DEV } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGOPATH : MONGO_DEV, {
  useNewUrlParser: true,
});
mongoose.set('strictQuery', true);

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = JWT_SECRET_DEV;
}

app.use(requestLogger);
const allowedCors = [
  'https://movies-explorer.nomoredomains.work',
  'http://movies-explorer.nomoredomains.work',
  'localhost:3000',
];
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return null;
});

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = { app };
