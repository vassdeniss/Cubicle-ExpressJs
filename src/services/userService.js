const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

exports.register = (data) => User.create(data);

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Cannot find username or password!');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Cannot find username or password!');
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });

  return token;
};
