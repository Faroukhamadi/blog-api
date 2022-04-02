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
      res.json({ list_posts });
    });
};

exports.published_post_list = (req, res, next) => {
  Post.find({ isPublished: true })
    .sort('-date')
    .exec((err, list_published_posts) => {
      if (err) return next(err);
      res.json({ list_published_posts });
    });
};

exports.delete_post = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) return next(err);
    res.send({ result });
  });
};

exports.update_post = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.send({ post });
  });
};

exports.post_comments_list = (req, res, next) => {
  Post.findById(req.params.id)
    .populate('comments')
    .exec((err, comments) => {
      console.log('id: ' + req.params.id + '---');
      if (err) return next(err);
      res.send({ comments });
    });
};
