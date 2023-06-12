const router = require('express').Router();

const { isAuth } = require('../middlewares/auth');
const accessoryService = require('../services/accessoryService');
const { getErrors } = require('../utils/errorHelper');

router.get('/create', isAuth, (req, res) => {
  res.render('accessory/create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    await accessoryService.create({ name, description, imageUrl });
    res.redirect('/');
  } catch (err) {
    res.render('accessory/create', { errorMessages: getErrors(err) });
  }
});

module.exports = router;
