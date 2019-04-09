var express = require('express');
var app = express();



var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



var pgp = require('pg-promise')();
//to do: set up db locally
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'finalproject3308',
	user: 'postgres',
	password: '123'
};

var db = pgp(dbConfig);

//display_login
app.get('/', function(req,res){
	res.render('login',{
		isValid: '',
	});
});

//display register page
app.get('/register',function(req,res){
	res.sendFile(__dirname+ '/htmls/register.html');
});

//post login info to db
app.post('/register/submit',function(req,res){
	var userName = req.body.userName;
	var email = req.body.emailAddress;
	var password = req.body.passwordFirst;
	var insert_statement = "INSERT INTO user_register(user_Name, password, email) VALUES('"+userName+"','"+password+"','"+email+"');";
	db.any(insert_statement)
		.then(info=>{
			res.render('register');
		})
		.catch(error=>{
			request.flash('error',error);
			response.render('register');
		})

});


//verify that login info is in DB
app.get('/login/verify',function(req,res){
	//console.log(req.query);
	//var userName = 'testName';
	//var userPass = 'testPass';
	
	var userName = req.query.inputEmail;
	var userPass = req.query.inputPassword;
	var checkUser = "SELECT * FROM user_register WHERE user_Name ='"+userName+"' and password = '"+userPass+"';";
	db.any(checkUser)
		.then(function(rows){
			res.render('login',{
				isValid: rows,
			});
		})
		.catch(function(err){
			request.flash('error', err);
			response.render('login',{
				isValid: '',
			});
		})
});

app.listen(2000);
console.log('server up on port 2000');