const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

// exports.user_signup_get = (req, res) => {};
exports.user_list = (req, res, next) => {
  User.find()
    .sort([['username', 'ascending']])
    .exec((err, list_users) => {
      if (err) return next(err);
      // Successful, so render
      res.json({ list_users });
    });
};

exports.comment_list = (req, res, next) => {
  Comment.find().exec((err, list_comments) => {
    if (err) return next(err);
    // Successful, so render
    res.json({ list_comments });
  });
};

exports.delete_user = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return next(err);
    res.send({ user });
  });
};

exports.delete_comment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) return next(err);
    res.send({ comment });
  });
};

exports.update_user = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    res.send({ user });
  });
};

exports.update_comment = (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    res.send({ comment });
  });
};

exports.post_comment = (req, res, next) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return next(err);
    Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id },
    }).exec((err, result) => {
      if (err) return next(err);
      res.send({ comment });
    });
  });
};
