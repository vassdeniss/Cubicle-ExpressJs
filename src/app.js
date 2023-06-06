const express = require('express');

const engine = require('./config/handleEngine');
const addMiddlewares = require('./config/handleMiddlewares');
const connectDb = require('./config/handleDatabase');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');

const app = express();

const PORT = process.env.PORT || 5000;

engine.useHandlebarsEngine(app);
addMiddlewares(app);

connectDb()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(`DB error: ${err}`));

app.use(homeController);
app.use('/cubes', cubeController);
app.use('/accessories', accessoryController);
app.use('/users', userController);
app.get('*', (req, res) => {
  res.redirect('/404');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
