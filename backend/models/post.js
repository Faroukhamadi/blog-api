const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  content: { type: String, required: true, minlength: 10, maxlength: 500 },
  Date: { type: Date, required: true },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
