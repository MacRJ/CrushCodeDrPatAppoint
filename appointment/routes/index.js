var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'CrushCodeDrPatHos'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Appointment System'
  });
});
router.get('/drOrPat/dr', function(req, res, next) {
  knex.raw(`SELECT * FROM doctors`)
    .then(function(data) {
      // console.log("doctor", data)
      res.render('drOrPat', {doctors: data.rows
      , title: "Doctors"})

    })
})

// get individual doctor info
router.get('/doctor/:id', function(req, res, next){
  knex.raw(`SELECT * FROM doctors WHERE id = ${req.params.id}`)
  .then(function(data){
    var id = data.rows[0]["id"]
    res.render('indiv', {title: "test", doctors: data.rows, id: id, docPat: "doctor"})

  })
})

// create doctor
router.post('/doctor/new', function(req, res, next){
  knex.raw(`INSERT into doctors(name, age, gender, hospital) VALUES ('${req.body.name}', '${req.body.age}', '${req.body.gender}', '${req.body.hospital}')`)
  .then(function(data){
    console.log("created")
    res.render('drOrPat', {doctors:data.rows, title:"Doctors"})
  })
})
// delete doctor
router.get('/doctor/delete/:id', function(req, res, next){
  knex.raw(`DELETE from doctors WHERE id=${req.params.id}`)
  .then(function(data){
    res.render('drOrPat', {doctors:data.rows, title:"Doctors"})
  })
})

// Update doctor
router.get('/doctor/update', function(req, res, next){
  conosole.log("update heard")
  knex.raw(`UPDATE doctors set name= ${req.body.name} WHERE id=${req.body.id}`)
  .then(function(data){
    res.render('/drOrPat', {doctors:data.rows, title:"Doctors"})
  })
})








module.exports = router;
