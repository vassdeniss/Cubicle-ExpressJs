const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
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
  difficultyLevel: {
    type: Number,
    required: [true, 'Difficulty is required!'],
  },
  accessories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accessory',
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
