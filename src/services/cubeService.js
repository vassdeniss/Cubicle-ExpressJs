const slugify = require('slugify');

const Cube = require('../models/Cube');

exports.getAll = async (search, from, to) => {
  let result = await Cube.find().lean();

  if (search) {
    result = result.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (from) {
    result = result.filter((cube) => cube.difficultyLevel >= Number(from));
  }

  if (to) {
    result = result.filter((cube) => cube.difficultyLevel <= Number(to));
  }

  return result;
};

exports.get = (cubeId) => Cube.findById(cubeId);

exports.getWith = (cubeId, ...includes) => {
  let cube = Cube.findById(cubeId);

  for (const include of includes) {
    cube = cube.populate(include);
  }

  return cube;
};

exports.getBySlug = (slug) => {
  // TODO: fix
  // const slugged = slugify(slug, {
  //   replacement: '-',
  //   lower: true,
  //   strict: true,
  // });
  // return cubes.find((cube) => cube.slug === slugged);
};

exports.create = (data) => Cube.create(data);
// TODO: fix slugs
// const newCube = {
//   id: uniqid(),
//   ...data,
//   slug: slugify(data.name, {
//     replacement: '-',
//     lower: true,
//     strict: true,
//   }),
// };

// cubes.push(newCube);

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId);
  cube.accessories.push(accessoryId);
  return cube.save();
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);
