const express = require('express');

const engine = require('./config/handleEngine');
const addMiddlewares = require('./config/handleMiddlewares');

const app = express();

const PORT = process.env.PORT || 5000;

engine.useHandlebarsEngine(app);
addMiddlewares(app);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
