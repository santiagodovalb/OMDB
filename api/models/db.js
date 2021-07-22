const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres@localhost/omdb', {logging: false, dialect: 'postgres'})

module.exports = sequelize