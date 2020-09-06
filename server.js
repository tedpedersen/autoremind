const express = require('express')
const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars')
const path = require('path')
// const routes = require('./controllers');

const hbs = exphbs.create({ helpers })
const routes = require('./routes')
const sequelize = require('./config/connection')
const scheduler = require('./scheduler')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// turn on routes
app.use(routes)
app.use(session(sess))

//Handlebars app
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`))
})
scheduler.start()
