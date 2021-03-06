const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post_controller = require('../controllers/postController');
const Post = require('../models/post');

router.get('/', post_controller.post_list);
router.get('/published', post_controller.published_post_list);
router.get('/post/:id', post_controller.post_comments_list);
router.delete('/:id', post_controller.delete_post);
router.put('/:id', post_controller.update_post);
router.post('/', post_controller.create_post);

module.exports = router;
