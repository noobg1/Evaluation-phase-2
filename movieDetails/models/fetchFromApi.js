const axios = require('axios')
const dbFunctions = require('../dbFunctions')

function fetchMovieDetails (req, res) {
  axios.get('https://movie-api-lyalzcwvbg.now.sh/paramount')
  .then(function (response) {
      response.data.forEach(function (data) {
        //console.log(data, typeof data)
        dbFunctions.insertMovieDetails(data.movieName, data.releaseDate, 'paramount')
        .then(function (result){
          console.log(result)
      })
      .catch(function (error) {
        console.log(error.toString())
      })
    }) 
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
    res.send(error.toString())
  });
}

function fetchActorDetails (req, res) {
  axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')
  .then(function (response) {
      response.data.forEach(function (data) {
        console.log(data, typeof data)
        const movieList = '{' + data.movies.toString() + '}'
        dbFunctions.insertActorDetails(data.actorName,movieList )
        .then(function (result){
          console.log(result)
        })
        .catch(function (error) {
          console.log(error.toString())
        })
    }) 
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
    res.send(error.toString())
  });
}

module.exports = { fetchActorDetails, fetchMovieDetails}