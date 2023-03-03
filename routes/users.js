const router = require('express').Router();
const { updateUserValidator } = require('../validators/users');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
