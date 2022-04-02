const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post_controller = require('../controllers/postController');
const Post = require('../models/post');

router.get('/', post_controller.post_list);
router.delete('/:id', post_controller.delete_post);
router.put('/:id', post_controller.update_post);

module.exports = router;
