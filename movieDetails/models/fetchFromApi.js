const axios = require('axios')
const dbFunctions = require('../dbFunctions')
const movieUrls = ['https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks' ]
const actorsUrls = ['https://movie-api-lyalzcwvbg.now.sh/actors']
const globalStudios = ['paramount', 'dreamworks']
let errorMessage = []

let fetchPromiseArrayMovies = []
let fetchPromiseArrayActors = []

function fetchMovieUrls() {
    movieUrls.forEach(function (movieUrl) {
    fetchPromiseArrayMovies.push(axios.get(movieUrl))
  })
}
 
function fetchActorUrls() {
  actorsUrls.forEach(function (actorsUrl) {
    fetchPromiseArrayActors.push(axios.get(actorsUrl))
  })
}

function insertIntoDbMovies () {
 return axios.all(fetchPromiseArrayMovies)
}

function insertIntoDbActors () {
  return axios.all(fetchPromiseArrayActors)
}

function insertUtility (req, res) {
  fetchMovieUrls()
  fetchActorUrls()
  insertIntoDbActors()
  .then(function (resultActorsUrls) {
    resultActorsUrls.forEach(function (actors, index) {
      const allActors = actors.data
      allActors.forEach(function (actor){
        const movieList = actor.movies
        movieList.forEach(function (movie) {
          dbFunctions.insertActorDetails(actor.actorName, movie )
          .then(function (dbInsertionResults){
            errorMessage.push(`\nAdding this list to actors db`)
            //console.log('Adding to actors db succeded')
          })
          .catch(function (error) {
            errorMessage.push(`\nFailed to add this = ${actor.actorName} list to actors db : duplication`)
            //console.log('Adding to actors db failed')
          })
        })
      })
    })
    return insertIntoDbMovies()
  })
  .then(function (studios) {
    studios.forEach(function (studio, index) {
      const movies = studio.data
      movies.forEach(function (movie) {
         dbFunctions.insertMovieDetails(movie.movieName, movie.releaseDate, globalStudios[index])
        .then(function(dbInsertionResults) {
          errorMessage.push('\nAdding this list to movies db')
          //console.log('Adding to movies db succeded')
        })
        .catch(function (error) {
          errorMessage.push( `\nFailed to add this = ${movie.movieName} list to movies db : duplication`)
          //console.log('Adding to movies db failed')
        })
      })
    })
    res.status(200).send({message: 'fetched  Update succeded', errors: errorMessage})
  })
  .catch(function (error) {
    //console.log('Somethinh went wrong:', errorMessage)
    res.status(500).send({message: 'Somethinh went wrong', error: errorMessage })
  })
}

module.exports = { insertUtility }