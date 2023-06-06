const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('user/login');
});

module.exports = router;
