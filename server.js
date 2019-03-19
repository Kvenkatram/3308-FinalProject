var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


//to do: set up db locally
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'ourDb',
	user: 'postgres',
	password: '123'
};



//display_login
app.get('/', function(req,res){
	res.render('login');
});

//display register page
app.get('/register',function(req,res){
	res.render('register');
});


//post login info to db

app.post('/register/submit',function(req,res){
	res.render('login');
	console.log("Hellooooo");
});


app.listen(3000);
console.log('server up on port 3000');