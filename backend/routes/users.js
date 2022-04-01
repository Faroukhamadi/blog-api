const express = require('express');
const user_controller = require('../controllers/userController');
const router = express.Router();

/* GET users listing. */
router.get('/', user_controller.user_list);
router.delete('/:id', user_controller.delete_user);
router.get('/comments', user_controller.comment_list);
router.delete('/comments/:id', user_controller.delete_comment);

module.exports = router;
