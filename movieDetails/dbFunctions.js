const sequelize = require('./dbConnect')

const selectAllMovieDetails = function () {
  return sequelize.query('SELECT NAME, RELEASEDATE, PRODUCTION FROM movie',
    { replacements: [], type: sequelize.QueryTypes.SELECT }
  )
}

const selectAllActorDetails = function () {
  return sequelize.query('SELECT NAME, movies FROM actors',
    { replacements: [], type: sequelize.QueryTypes.SELECT }
  )
}

const insertMovieDetails = function (name, release, production) {
  return sequelize.query('INSERT INTO movie (name, releasedate, production) VALUES (?,? , ?) RETURNING ID',
    { replacements: [name, release, production], type: sequelize.QueryTypes.SELECT }
  )
}

const insertActorDetails = function (name, movieList) {
  return sequelize.query('INSERT INTO actors (name, movies) VALUES (?, ?) RETURNING ID',
    { replacements: [name, movieList] }
  )
}

module.exports = { selectAllMovieDetails, insertMovieDetails, insertActorDetails, selectAllActorDetails }
