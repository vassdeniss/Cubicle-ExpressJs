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
  let cube;
  try {
    cube = await cubeService.getWith(req.params.cubeId, 'accessories').lean();
  } catch (_) {
    return res.redirect('/404');
  }

  const isOwner = cube.owner.toString() === req.user?._id;

  res.render('cube/details', { cube, isOwner });
});

router.get('/attach/:cubeId', isAuth, async (req, res, next) => {
  let cube;
  try {
    cube = await cubeService.get(req.params.cubeId).lean();
  } catch (_) {
    return res.redirect('/404');
  }

  if (cube.owner.toString() !== req.user?._id) {
    return next(new Error('You do not own this cube!'));
  }

  const accessories = await accessoryService.getExcept(cube.accessories).lean();
  const hasAccessories = accessories.length > 0;

  res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/attach/:cubeId', isAuth, async (req, res, next) => {
  const cubeId = req.params.cubeId;
  const { accessory: accessoryId, ownerId } = req.body;

  if (ownerId !== req.user?._id) {
    return next(new Error('You do not own this cube!'));
  }

  try {
    await cubeService.attachAccessory(cubeId, accessoryId);
    res.redirect(`/cubes/details/${cubeId}`);
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:cubeId', isAuth, async (req, res, next) => {
  let cube;
  try {
    cube = await cubeService.get(req.params.cubeId).lean();
  } catch (_) {
    return res.redirect('/404');
  }

  if (cube.owner.toString() !== req.user?._id) {
    return next(new Error('You do not own this cube!'));
  }

  const options = getDifficulties(cube.difficultyLevel);

  res.render('cube/delete', { cube, options });
});

router.post('/delete/:cubeId', isAuth, async (req, res, next) => {
  const { ownerId } = req.body;

  if (ownerId !== req.user?._id) {
    return next(new Error('You do not own this cube!'));
  }

  await cubeService.delete(req.params.cubeId);
  res.redirect('/');
});

router.get('/edit/:cubeId', isAuth, async (req, res, next) => {
  let cube;
  try {
    cube = await cubeService.get(req.params.cubeId).lean();
  } catch (_) {
    return res.redirect('/404');
  }

  if (cube.owner.toString() !== req.user?._id) {
    return next(new Error('You do not own this cube!'));
  }

  const options = getDifficulties(cube.difficultyLevel);

  res.render('cube/edit', { cube, options });
});

router.post('/edit/:cubeId', isAuth, async (req, res, next) => {
  const { name, description, imageUrl, difficultyLevel, ownerId } = req.body;

  if (ownerId !== req.user?._id) {
    return next(new Error('You do not own this cube!'));
  }

  try {
    await cubeService.update(req.params.cubeId, {
      name,
      description,
      imageUrl,
      difficultyLevel,
    });
    res.redirect(`/cubes/details/${req.params.cubeId}`);
  } catch (err) {
    const cube = await cubeService.get(req.params.cubeId).lean();
    const options = getDifficulties(cube.difficultyLevel);
    res.render('cube/edit', { cube, options, errorMessages: getErrors(err) });
  }
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
    selected: Number(difficulty) === i + 1 ? 'selected' : '',
  }));

  return options;
}

module.exports = router;
