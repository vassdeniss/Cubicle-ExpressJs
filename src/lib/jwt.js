const util = require('util');
const jsonwebtoken = require('jwt');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  verify: util.promisify(jsonwebtoken.verify),
};

module.exports = jwt;
