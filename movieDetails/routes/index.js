const express = require('express')
const router = express.Router()
const apiFetchUtilities = require('../models/fetchFromApi')
const fetchFromDb = require('../models/fetchFromDb')
const dbFunctions = require('../dbFunctions')



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});


router.get('/movie/:movieName', function(req, res) {
  let search = req.params.movieName, releasedate
  search = search.replace('%20',' ')
  let finalResult = ''
  
  Promise.all([dbFunctions.selectAllMovieDetails(search), dbFunctions.selectAllActorDetails(search)])
  .then(function (result) {    
    let actorArray = result[1].map(function(value, index) {
      return value.name;
    });
    finalResult = {movieName: search, releasedate: result[0][0].releasedate, actors: actorArray, studio:result[0][0].production }
    res.send(finalResult )
  })
  .catch(function (error) {
    console.log(error)
    res.send(500)
  })
})

router.get('/fetch', function(req, res) {
  apiFetchUtilities.fetchActorDetails(req, res)
  apiFetchUtilities.fetchMovieDetails(req, res)
})

module.exports = router;
