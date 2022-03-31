const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { formatISO9075 } = require('date-fns');

const CommentSchema = new Schema({
  content: { type: String, minlength: 3, maxlength: 100, required: true },
  Date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

CommentSchema.virtual('dateTime').get(function () {
  const fullDate = formatISO9075(this.Date);
  return fullDate.substring(0, 10) + ' | ' + fullDate.substring(11, 16);
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
