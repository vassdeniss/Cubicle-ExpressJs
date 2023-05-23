const router = require('express').Router();

const cubeService = require('../managers/cubeService');

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });

  res.redirect('/');
});

module.exports = router;
