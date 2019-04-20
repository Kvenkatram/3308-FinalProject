var express = require('express');
var app = express();


const path = require('path');
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

let playlistID;

var pgp = require('pg-promise')();
//For local db
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'finalproject3308',
	user: 'postgres',
	password: '123'
};

//for Horuku
//const dbConfig = process.env.DATABASE_URL;

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
	//var isNewUser = "SELECT * FROM user_register WHERE user_Name ='"+userName+"' and password = '"+userPass+"';";

	db.any(insert_statement)
		.then(function(insert){
			res.render('login');
		})
		.catch(function(err){
			request.flash('error',err);
			response.render('register');
		})
});

//to do set login path to weather screen
//verify that login info is in DB
app.get('/login/verify',function(req,res){
	//console.log(req.query);
	//var userName = 'testName';
	//var userPass = 'testPass';
	var userEmail = req.query.inputEmail;
	var userPass = req.query.inputPassword;
	var checkUser = "SELECT * FROM user_register WHERE email ='"+userEmail+"' and password = '"+userPass+"';";
	db.any(checkUser)
		.then(function(rows){
			if(rows[0] != undefined){
				res.render('weatherPage');
			}
			else{
				res.render('login',{
					isValid: rows
				});
			}
		})
		.catch(function(err){
			request.flash('error', err);
			response.render('login',{
				isValid: '',
			});
		})
});

app.get('/home',function(req,res){
	var cityName = req.query.cityName;
	var weatherId = req.query.weatherId;
	var curTemp = req.query.curTemp;
	var minTemp = req.query.minTemp;
	var maxTemp = req.query.maxTemp;
	songCascade("done");
	if(playlistID != undefined){
		res.render('home',{
			pLID: playlistID,
			guestUsername:'username',
			location: cityName,
			weatherId: weatherId,
			currTemp: curTemp,
			minTemp: minTemp,
			maxTemp: maxTemp,
		})
	}
});


app.get('/home/playlists', function(req,res){



});


app.get('/weatherPage',function(req,res){
	//res.sendFile(path.join(__dirname+'/views/weatherPage.html'));
	res.render('weatherPage')
});
let client_id = "011752af6d22471880ead0a4a1e6b09b";
let client_secret = "c301ed02c7734ec1ac78c13da98980c0";

let basic = new Buffer(client_id + ':' + client_secret).toString('base64'); 
let Spotify = require('node-spotify-api');
//var keyword = "bread";
let refreshToken = "AQCbz2qFhfgBMIuCCcdho8kxSZRqStiUXJk-YhChSiLroQPO9kuTlH1PSvM9x48GGOzTARmv_GW2SrPyv1nBIJWmybWHWQEiMPiE0RC4hzrALZXPzj9IsbypycXqVKJsdd2Img";
let aToken;
let request = require('request');
let refreshHeaders = {
    'Authorization': 'Basic '+ basic,
    'Content-Type': 'application/x-www-form-urlencoded'
};

let refreshString = 'grant_type=refresh_token&refresh_token=' + refreshToken;

let refreshOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: refreshHeaders,
    body: refreshString
};

let spotify = new Spotify({
  id: client_id,
  secret: client_secret
});
let uris = "uris=";
let dataString;
function songCascade(keyword){
  dataString = '{"name":"'+keyword+'", "public":true}';
  spotify.search({ type: 'track', query: keyword, limit: 20}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for(var i = 0; i < 20; i++){
      uris += "spotify%3Atrack%3A" + data.tracks.items[i].id;
      if(i != 19){
        uris+=",";
      }
    }
    request(refreshOptions,refreshCallback);
  });
}
 function playlistCallback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
        playlistID = String(JSON.parse(body).id);
        var addSongHeaders = {
            'Authorization': 'Bearer '+ aToken,
            'Accept': 'application/json'
        };
        var addSongOptions = {
          url: 'https://api.spotify.com/v1/playlists/'+playlistID+'/tracks?'+uris,
          method: 'POST',
          headers: addSongHeaders
         };
        request(addSongOptions,addSongCallback);
    }
    else{
      console.log(response.statusCode);
      console.log(error);
    }
}
function addSongCallback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
        console.log(body);
    }
    else{
      console.log(response.statusCode);
    }
}

function refreshCallback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
        console.log(body);
        aToken =JSON.parse(body).access_token;
        var playlistHeaders = {
            'Authorization': 'Bearer ' + aToken,
            'Content-Type': 'application/json'
        };
        var playlistOptions = {
            url: 'https://api.spotify.com/v1/users/cfg0osr6p8on2rewhju2n2z3z/playlists',
            method: 'POST',
            headers: playlistHeaders,
            body: dataString
        };
        request(playlistOptions,playlistCallback);
    }
    else{
      console.log(response.statusCode);
    }
}




app.listen(2000);
console.log('server up on port 2000');
