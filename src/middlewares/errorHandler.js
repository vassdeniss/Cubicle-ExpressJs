const { getErrors } = require('../utils/errorHelper');

module.exports = (err, req, res, next) => {
  const messages = getErrors(err);
  res.render('404', { errorMessages: messages });
};
