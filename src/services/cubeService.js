const uniqid = require('uniqid');
const slugify = require('slugify');

const cubes = [
  {
    id: uniqid(),
    name: 'GAN 13 Maglev',
    description: '',
    imageUrl:
      'http://www.bezpanika.com/images/stories/main_NEW/gan_13_mainn.jpg',
    difficultyLevel: 3,
    slug: 'gan-13-maglev',
  },
];

exports.getAll = () => {
  return cubes.slice();
};

exports.getBySlug = (name) => {
  const slugged = slugify(name, {
    replacement: '-',
    lower: true,
    strict: true,
  });

  return cubes.find((cube) => cube.slug === slugged);
};

exports.create = (data) => {
  const newCube = {
    id: uniqid(),
    ...data,
    slug: slugify(data.name, {
      replacement: '-',
      lower: true,
      strict: true,
    }),
  };

  cubes.push(newCube);

  return newCube;
};
