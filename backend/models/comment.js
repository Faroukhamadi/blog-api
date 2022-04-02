const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { formatISO9075 } = require('date-fns');

const CommentSchema = new Schema({
  content: { type: String, minlength: 3, maxlength: 500, required: true },
  Date: { type: Date, required: true },
  name: { type: String, minlength: 3, maxlength: 50, required: true },
});

CommentSchema.virtual('dateTime').get(function () {
  const fullDate = formatISO9075(this.Date);
  return fullDate.substring(0, 10) + ' | ' + fullDate.substring(11, 16);
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
