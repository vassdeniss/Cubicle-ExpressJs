const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });

  res.redirect('/');
});

// TODO: fix slug
// router.get('/details/:slug', (req, res) => {
router.get('/details/:cubeId', async (req, res) => {
  //const cube = cubeService.getBySlug(req.params.slug);
  const cube = await cubeService.get(req.params.cubeId).lean();

  if (!cube) {
    return res.redirect('/404');
  }

  res.render('details', { cube });
});

module.exports = router;
