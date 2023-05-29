const uniqid = require('uniqid');
const slugify = require('slugify');

const Cube = require('../models/Cube');

exports.getAll = () => Cube.find();

exports.get = (cubeId) => Cube.findById(cubeId);

exports.getBySlug = (slug) => {
  // TODO: fix
  // const slugged = slugify(slug, {
  //   replacement: '-',
  //   lower: true,
  //   strict: true,
  // });
  // return cubes.find((cube) => cube.slug === slugged);
};

exports.create = async (data) => {
  const cube = await Cube.create(data);

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

  return cube;
};
