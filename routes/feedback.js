const express = require('express');
const router = express.Router();

const { feedback, userGiveFeedback } = require('../controllers/feedback');

router.route('/').post(feedback);
router.route('/user-give-feedback').put(userGiveFeedback);

module.exports = router;