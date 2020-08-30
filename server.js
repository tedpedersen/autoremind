const express = require('express');
const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars');
const path = require('path');
// const routes = require('./controllers');

const hbs = exphbs.create({ helpers });
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

//Handlebars app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));

