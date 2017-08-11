var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'CrushCodeDrPatHos'
  }
});

// get individual doctor info
router.get('/doctor/bla', function(req, res, next){
  // var id = ${req.params.id}
  // console.log("id", id)
  knex.raw(`SELECT * FROM doctors WHERE id = 2`)
  .then(function(data){
    console.log("doctorIndi")
    res.render('indiv', {title: "test"})

  })
})



module.exports = router;
