const router = require('express').Router();

const cubeService = require('../services/cubeService');

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

router.get('/details/:cubeName', (req, res) => {
  const cube = cubeService.getByName(req.params.cubeName);

  res.render('details', { cube });
});

module.exports = router;
