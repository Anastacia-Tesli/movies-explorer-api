const router = require('express').Router();
const { loginValidator, createUserValidator } = require('../validators/users');
const { login, createUser } = require('../controllers/users');
const PAGE_NOT_FOUND_MESSAGE = require('../utils/constants');
const { NotFoundError } = require('../errors/index');
const { auth } = require('../middlewares/auth');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE));
});
module.exports = router;
