const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.post_list = (req, res, next) => {
  Post.find()
    .sort('-date')
    .exec((err, list_posts) => {
      if (err) return next(err);
      // Successful, so render
      res.json({ list_posts });
    });
};

exports.delete_post = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) return next(err);
    res.send({ result });
  });
};
