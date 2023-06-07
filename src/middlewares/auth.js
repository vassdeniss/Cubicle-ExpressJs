const jwt = require('../lib/jwt');

exports.auth = async (req, res, next) => {
  const token = req.cookies['user-token'];
  if (token) {
    try {
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      res.clearCookie('user-token');
      res.redirect('/users/login');
    }
  } else {
    next();
  }
};