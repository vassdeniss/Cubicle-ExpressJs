const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  const cube = cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });

  res.json(cube);

  //res.redirect('/');
});

module.exports = router;
