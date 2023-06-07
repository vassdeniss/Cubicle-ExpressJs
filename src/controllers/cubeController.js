const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
  res.render('cube/create');
});

router.post('/create', async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
  });

  res.redirect('/');
});

// TODO: fix slug
// router.get('/details/:slug', (req, res) => {
router.get('/details/:cubeId', async (req, res) => {
  //const cube = cubeService.getBySlug(req.params.slug);
  const cube = await cubeService
    .getWith(req.params.cubeId, 'accessories')
    .lean();

  if (!cube) {
    return res.redirect('/404');
  }

  res.render('cube/details', { cube });
});

router.get('/attach/:cubeId', async (req, res) => {
  const cube = await cubeService.get(req.params.cubeId).lean();
  const accessories = await accessoryService.getExcept(cube.accessories).lean();

  const hasAccessories = accessories.length > 0;

  res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/attach/:cubeId', async (req, res) => {
  const cubeId = req.params.cubeId;
  const { accessory: accessoryId } = req.body;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/delete/:cubeId', async (req, res) => {
  const cube = await cubeService.get(req.params.cubeId).lean();
  const title = getDifficulties(cube.difficultyLevel);

  res.render('cube/delete', { cube, title });
});

function getDifficulties(difficulty) {
  const titles = [
    '1 - Very Easy',
    '2 - Easy',
    '3 - Medium (Standard 3x3)',
    '4 - Intermediate',
    '5 - Expert',
    '6 - Hardcore',
  ];

  return titles[Number(difficulty) - 1];
}

module.exports = router;
