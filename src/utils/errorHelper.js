const { MongooseError } = require('mongoose');

exports.getErrors = (error) => {
  if (error instanceof MongooseError) {
    return Object.values(error.errors).map((err) => err.message);
  } else if (error instanceof Error) {
    return [error.message];
  }
};
