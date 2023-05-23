const uniqid = require('uniqid');

const cubes = [];

exports.create = (data) => {
  const newCube = {
    id: uniqid(),
    ...data,
  };

  cubes.push(newCube);

  return newCube;
};
