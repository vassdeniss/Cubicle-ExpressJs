const router = require('express').Router();

const { isAuth } = require('../middlewares/auth');
const userService = require('../services/userService');
const { getErrors } = require('../utils/errorHelper');

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userService.login(username, password);
    res.cookie('user-token', token, { httpOnly: true });
    res.redirect('/');
  } catch (err) {
    res.render('user/login', { errorMessages: getErrors(err) });
  }
});

router.get('/register', (req, res) => {
  res.render('user/register');
});

router.post('/register', async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  try {
    await userService.register({ username, password, repeatPassword });
    res.redirect('/users/login');
  } catch (err) {
    res.render('user/register', { errorMessages: getErrors(err) });
  }
});

router.get('/logout', isAuth, (req, res) => {
  res.clearCookie('user-token');
  res.redirect('/');
});

module.exports = router;
