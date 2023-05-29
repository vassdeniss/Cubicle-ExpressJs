const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/', async (req, res) => {
  const cubes = await cubeService.getAll().lean();
  const hasCubes = cubes.length > 0;

  res.render('index', { cubes, hasCubes });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
