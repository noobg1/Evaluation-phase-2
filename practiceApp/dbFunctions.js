const sequelize = require('./dbConnect')

const selectFromStudent = function () {
  return sequelize.query('SELECT NAME FROM student_info WHERE id = ?',
    { replacements: [1], type: sequelize.QueryTypes.SELECT }
  )
}

module.exports = { selectFromStudent }
