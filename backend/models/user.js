const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, minlength: 3, maxlength: 100, required: true },
  password: { type: String, minlength: 5, maxlength: 100, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
