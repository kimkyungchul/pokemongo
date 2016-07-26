var express = require('express');
var router = express.Router();

// mysql 
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :db.host,
    port : db.port,
    user : db.user,
    password : db.password,
    database:db.database
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
	   connection.query('select * from PokemonMapDB.location',function(err,rows){
	        console.log("rows : " + JSON.stringify(rows));

	        res.render('index', { title: 'ejs', rows: rows });
	   });

});

router.post('/', function(req, res, next) {
  var pokeno = req.body.pokeno;
  var korpattern = /^[가-힣]+$/;
  
	if(korpattern.test(pokeno)){
		connection.query('select pno from PokemonMapDB.info where pname='+mysql.escape(pokeno),function(err,ponum){
			console.log("ponum : " + JSON.stringify(ponum[0].pno));

			connection.query('select * from PokemonMapDB.location where pno='+mysql.escape(ponum[0].pno),function(err,rows){
	        console.log("rows : " + JSON.stringify(rows));

	        res.render('index', { title: 'ejs', rows: rows });
	   });
	   });
	}
	
	else{
  	   connection.query('select * from PokemonMapDB.location where pno='+mysql.escape(pokeno),function(err,rows){
	        console.log("rows : " + JSON.stringify(rows));

	        res.render('index', { title: 'ejs', rows: rows });
	   });
	}
});

module.exports = router;
