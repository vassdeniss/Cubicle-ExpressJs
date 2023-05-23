const express = require('express');
const path = require('path');

function addMiddlewares(app) {
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.use(express.urlencoded({ extended: false }));
}

module.exports = addMiddlewares;
