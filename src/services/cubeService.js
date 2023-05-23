const uniqid = require('uniqid');

const cubes = 0;

exports.create = (data) => {
  const newCube = {
    id: uniqid(),
    ...data,
  };

  cubes.push(newCube);

  return newCube;
};
