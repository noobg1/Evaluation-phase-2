const express = require('express')
const router = express.Router()
const apiFetchUtilities = require('../models/fetchFromApi')
const dbFunctions = require('../dbFunctions')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.get('/movie/:movieName', function(req, res) {
  let search = req.params.movieName, releasedate
  search = search.replace('%20',' ')
  let finalResult = ''

  Promise.all([dbFunctions.selectMovieDetails(search), dbFunctions.selectActorDetails(search)])
  .then(function (result) {

    let actorArray = result[1].map(function(value, index) {
      return value.name;
    });
    
    if(!result[0][0].hasOwnProperty('releasedate'))
      releasedate = ''
    else {
      releasedate = result[0][0].releasedate
    }
    if(!result[0][0].hasOwnProperty('production'))
      studio = ''
    else {
      studio = result[0][0].production
    }

    finalResult = { movieName: search, releasedate , actors: actorArray , studio }
    res.send(finalResult)
  })
  .catch(function (error) {
    res.status(404).send({error: 'Movie name not found'})
  })
})

router.get('/fetch', function(req, res) {
  // apiFetchUtilities.fetchActorDetails(req, res)
  // apiFetchUtilities.fetchMovieDetails(req, res)
  //apiFetchUtilities.fetchMovieAndActors(req, res)
  apiFetchUtilities.insertUtility(req, res)
})

module.exports = router;
