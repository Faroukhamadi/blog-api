const express = require('express');
const user_controller = require('../controllers/userController');
const router = express.Router();

/* GET users listing. */
router.get('/', user_controller.user_list);
router.get('/comments', user_controller.comment_list);

module.exports = router;
