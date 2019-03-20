var express = require('express');
var app = express();



var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
	res.render('register');
	var test = req.body.firstName;
	var userName = req.body.userName;
	var email = req.body.emailAddress;
	var password = req.body.passwordFirst;
	var insert_statement = ";";
});


app.listen(2000);
console.log('server up on port 2000');