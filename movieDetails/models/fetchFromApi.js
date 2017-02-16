const axios = require('axios')
const dbFunctions = require('../dbFunctions')
const movieUrls = ['https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks' ]

function fetchMovieDetails (req, res) {
  movieUrls.forEach(function (movieUrl) {
    axios.get(movieUrl)
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
  })
  
}

function fetchActorDetails (req, res) {
  axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')
  .then(function (response) {
      response.data.forEach(function (data) {
        const movieList =   data.movies
        movieList.forEach(function (movie){
          dbFunctions.insertActorDetails(data.actorName, movie )
          .then(function (result){
            //console.log(result)
          })
          .catch(function (error) {
            console.log(error.toString())
          })
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