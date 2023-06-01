const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();

exports.create = (data) => Accessory.create(data);
