const sequelize = require('./dbConnect')

const selectAllMovieDetails = function (movieName) {
  return sequelize.query('SELECT NAME, RELEASEDATE, PRODUCTION FROM movie WHERE NAME = ?',
    { replacements: [movieName], type: sequelize.QueryTypes.SELECT }
  )
}

const selectAllActorDetails = function (movieName) {
  return sequelize.query('SELECT DISTINCT(NAME) FROM actors WHERE movies = ?',
    { replacements: [movieName], type: sequelize.QueryTypes.SELECT }
  )
}

const insertMovieDetails = function (name, release, production) {
  return sequelize.query(' INSERT INTO movie (name, releasedate, production) VALUES (?,? , ?) RETURNING ID',
    { replacements: [name, release, production], type: sequelize.QueryTypes.SELECT }
  )
}

const insertActorDetails = function (name, movie) {
  return sequelize.query(' INSERT INTO actors (name, movies) VALUES (?, ?) RETURNING ID',
    { replacements: [name, movie] }
  )
}

module.exports = { selectAllMovieDetails, insertMovieDetails, insertActorDetails, selectAllActorDetails }
