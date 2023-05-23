const express = require('express');

const engine = require('./config/handleEngine');
const addMiddlewares = require('./config/handleMiddlewares');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

const app = express();

const PORT = process.env.PORT || 5000;

engine.useHandlebarsEngine(app);
addMiddlewares(app);

app.use(homeController);
app.use('/cubes', cubeController);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
