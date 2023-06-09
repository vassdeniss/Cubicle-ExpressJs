const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const { getErrors } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/auth');

router.get('/create', isAuth, (req, res) => {
  res.render('cube/create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  try {
    await cubeService.create({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
      owner: req.user._id,
    });

    res.redirect('/');
  } catch (err) {
    res.render('cube/create', { errorMessages: getErrors(err) });
  }
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
  const options = getDifficulties(cube.difficultyLevel);

  res.render('cube/delete', { cube, options });
});

router.post('/delete/:cubeId', async (req, res) => {
  await cubeService.delete(req.params.cubeId);
  res.redirect('/');
});

router.get('/edit/:cubeId', async (req, res) => {
  const cube = await cubeService.get(req.params.cubeId).lean();
  const options = getDifficulties(cube.difficultyLevel);

  res.render('cube/edit', { cube, options });
});

router.post('/edit/:cubeId', async (req, res) => {
  await cubeService.update(req.params.cubeId, req.body);

  res.redirect(`/cubes/details/${req.params.cubeId}`);
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

  const options = titles.map((v, i) => ({
    title: v,
    value: i + 1,
    isSelected: Number(difficulty) === i + 1,
  }));

  return options;
}

module.exports = router;
