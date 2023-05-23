const uniqid = require('uniqid');

const cubes = [
  {
    id: uniqid(),
    name: 'GAN 13 Maglev',
    description: '',
    imageUrl:
      'http://www.bezpanika.com/images/stories/main_NEW/gan_13_mainn.jpg',
    difficultyLevel: 3,
  },
];

exports.getAll = () => {
  return cubes.slice();
};

exports.getByName = (name) => {
  return cubes.find((cube) => normalize(cube.name) === name);
};

exports.create = (data) => {
  const newCube = {
    id: uniqid(),
    ...data,
  };

  cubes.push(newCube);

  return newCube;
};

function normalize(name) {
  return name.replaceAll(new RegExp(/\s+/g), '-').toLowerCase();
}
