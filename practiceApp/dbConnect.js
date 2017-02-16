let Sequelize = require('sequelize')
let sequelize = new Sequelize('postgres://jeevanndc@localhost:5432/student')

module.exports = sequelize

