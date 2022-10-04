const express = require('express');
const router = express.Router();

const { register, login, findAUser } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/find-user').post(findAUser);

module.exports = router;