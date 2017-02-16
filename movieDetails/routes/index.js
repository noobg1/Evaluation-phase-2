const express = require('express')
const router = express.Router()
const fetchUtilities = require('../models/fetchFromApi')
const dbFunctions = require('../dbFunctions')



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.get('/fetchMovieFromDb', function(req, res) {
  dbFunctions.selectAllMovieDetails()
  .then(function (result) {
    console.log('done')
    res.send(result)
  })
  .catch(function (error) {
    console.log(error)
    res.send(500)
  })
})

router.get('/fetchActorsFromDb', function(req, res) {
  dbFunctions.selectAllActorDetails()
  .then(function (result) {
    console.log('done')
    res.send(result)
  })
  .catch(function (error) {
    console.log(error)
    res.send(500)
  })
})

router.get('/fetch', function(req, res) {
  fetchUtilities.fetchActorDetails(req, res)
  fetchUtilities.fetchMovieDetails(req, res)
})

module.exports = router;
