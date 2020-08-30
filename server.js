const express = require('express');
const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');

const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//Handlebars app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));

