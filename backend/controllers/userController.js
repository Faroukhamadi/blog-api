const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

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
      console.log(req.body);
      res.send({ comment });
    });
  });
};

exports.user_signup_post = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return next(err);
    if (user) {
      res.status = 409;
      return res.send({ message: 'User already exists' });
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      user.save((err, result) => {
        if (err) return next(err);
        res.send({ result });
      });
    });
  });
};

exports.user_login_post = passport.authenticate('local');

exports.user_logout = (req, res) => {
  if (req.user) console.log('user exists before logout');
  else console.log('user doesnt exist before logout');
  req.logout();
  res.json(req.user);
};
