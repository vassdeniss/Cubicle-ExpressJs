const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [5, 'Length must be at least 5 characters!'],
    match: /^[A-Za-z0-9\s]+$/,
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    minLength: [20, 'Length must be at least 20 characters!'],
    match: /^[A-Za-z0-9\s]+$/,
  },
  imageUrl: {
    type: String,
    required: false,
    match: /^http:\/\/|^https:\/\//,
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
