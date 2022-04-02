const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  content: { type: String, required: true, minlength: 10, maxlength: 5000 },
  Date: { type: Date, required: true },
  isPublished: { type: Boolean, required: true, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
