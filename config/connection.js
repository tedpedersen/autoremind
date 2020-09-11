// import the Sequelize constructor from the library
const Sequelize = require('sequelize')
require('dotenv').config()

// create connection to our db
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'ec2-3-215-207-12.compute-1.amazonaws.com',
    dialect: 'mysql',
    port: 5432
  }
)

module.exports = sequelize
