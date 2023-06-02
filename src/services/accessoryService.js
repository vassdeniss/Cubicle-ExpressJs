const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();

exports.create = (data) => Accessory.create(data);

exports.getExcept = (accessoryIds) =>
  Accessory.find().where('_id').nin(accessoryIds);
