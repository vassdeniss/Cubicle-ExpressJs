const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
});

userSchema.virtual('password');

userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError('Password mismatch!');
  }
});

userSchema.pre('save', async function () {
  this.passwordHash = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
