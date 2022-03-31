#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];
const comments = [];

function userCreate(username, password, comments, isAdmin, cb) {
  let userDetail = {
    username: username,
    password: password,
    comments: comments,
    isAdmin: isAdmin,
  };
  const user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New user: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function postCreate(title, content, Date, cb) {
  const post = new Post({
    title: title,
    content: content,
    Date: Date,
  });

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New post: ' + post);
    posts.push(post);
    cb(null, post);
  });
}
function commentCreate(content, Date, user, cb) {
  const comment = new Comment({
    content: content,
    Date: Date,
    user: user,
  });

  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Comment: ' + comment);
    comments.push(comment);
    console.log('comments array: ', comments);
    cb(null, comment);
  });
}

function createProductsCategories(cb) {
  async.series(
    [
      function (callback) {
        commentCreate(
          'Opening his morning comment, she read.',
          new Date(),
          users[0],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'He repeated her comment about the Porsche, "Nice wheels."',
          new Date(),
          users[0],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Without comment, he shifted his attention back to his plate.',
          new Date(),
          users[1],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'She sensed this comment was directed at her.',
          new Date(),
          users[1],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'I think she was merely directing the comment at you because she thought you might want to know.',
          new Date(),
          users[2],
          callback
        );
      },
      function (callback) {
        commentCreate(
          "The man just nodded but didn't comment further.",
          new Date(),
          users[2],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'It was this that saved her from some snide comment about her less-than-fashionable clothes.',
          new Date(),
          users[3],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'One of the ladies who worked at the courthouse made an offhand comment about the popular Lucky Pup Mine.',
          new Date(),
          users[3],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Before Dean could comment, the conversation ended as a commotion upstairs called for his attention.',
          new Date(),
          users[4],
          callback
        );
      },
      function (callback) {
        commentCreate(
          'At least he was considerate enough not to comment on her obvious interest in his physique.',
          new Date(),
          users[4],
          callback
        );
      },
      function (callback) {
        userCreate(
          'faroukhamadi',
          'passwordfarouk',
          [comments[0], comments[1]],
          true,
          callback
        );
      },
      function (callback) {
        userCreate(
          'hayetmejri',
          'passwordhayet',
          [comments[2], comments[3]],
          false,
          callback
        );
      },
      function (callback) {
        userCreate(
          'mihyarhamadi',
          'passwordmihyar',
          [comments[4], comments[5]],
          false,
          callback
        );
      },
      function (callback) {
        userCreate(
          'nardinehamadi',
          'passwordnardine',
          [comments[6], comments[7]],
          false,
          callback
        );
      },
      function (callback) {
        userCreate(
          'aoushamadi',
          'passwordaous',
          [comments[8], comments[9]],
          false,
          callback
        );
      },

      function (callback) {
        postCreate(
          'The Cheesecake Factory: Use humor and great photos',
          'This is an American chain of restaurants, localized around the world. If you’re not familiar with it.',
          new Date(),
          callback
        );
      },
      function (callback) {
        postCreate(
          'Google: Share interesting customer stories',
          "Google Maps is one of those things that doesn't need much explaining. Most people know what it does, it helps you get from A to B.",
          new Date(),
          callback
        );
      },
      function (callback) {
        postCreate(
          "Tony's Chocolate lonely: Show people what's happening",
          'Includes amazing features with fast charging capabilities that are amazingly crafted by our apple hard-working employees',
          new Date(),
          callback
        );
      },
      function (callback) {
        postCreate(
          'The Clay Creative Co: Increase followers with giveaways',
          "Now, this is an online store you've probably not heard of, as it’s a small business from the UK that sells its earrings through Etsy.",
          new Date(),
          callback
        );
      },
      function (callback) {
        postCreate(
          'Social Media Examiner: Share your expertise',
          "Social Media Examiner is a media company that's based in the United States. It publishes online magazines.",
          new Date(),
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createProductsCategories],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('posts: ' + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
