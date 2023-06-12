const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [5, 'Name must be at least 5 characters!'],
    match: [
      /^[A-Za-z0-9\s]+$/,
      'Name can only contain alphanumeric characters (and spaces)!',
    ],
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    minLength: [20, 'Description must be at least 20 characters!'],
    match: [
      /^[A-Za-z0-9\s]+$/,
      'Description can only contain alphanumeric characters (and spaces)!',
    ],
  },
  imageUrl: {
    type: String,
    required: false,
    match: [
      /^http:\/\/|^https:\/\//,
      'URL must start with either \'http://\' or \'https://\'!',
    ],
  },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
