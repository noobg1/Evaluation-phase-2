const express = require('express')
const router = express.Router()
const dbFunctions = require('../dbFunctions')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.get('/allStudents', function(req, res) {
  dbFunctions.selectFromStudent()
  .then(function (result) {
    console.log('done')
    res.send(result)
  })
  .catch(function (error) {
    console.log(error)
  })
})

module.exports = router;
