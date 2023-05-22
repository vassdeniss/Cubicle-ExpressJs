const hb = require('express-handlebars');

function useHandlebarsEngine(app) {
  app.engine(
    'hbs',
    hb.engine({
      extname: 'hbs',
    })
  );

  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
}

module.exports = {
  useHandlebarsEngine,
};
