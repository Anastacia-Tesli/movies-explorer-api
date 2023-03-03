const router = require('express').Router();
const { NotFoundError } = require('../errors/index');
const { PAGE_NOT_FOUND_MESSAGE } = require('../utils/constants');
const { auth } = require('../middlewares/auth');

router.use('/', require('./auth'));

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE));
});

export default router;
