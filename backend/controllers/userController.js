const User = require('../models/user');
const Comment = require('../models/comment');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.user_signup_get = (req, res) => {};
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
