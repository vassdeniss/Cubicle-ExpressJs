const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9]+$/,
    minLength: 5,
  },
  password: {
    type: String,
    match: /^[A-Za-z0-9]+$/,
    required: true,
    minLength: 8,
  },
});

userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new Error('Password mismatch!');
  }
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
