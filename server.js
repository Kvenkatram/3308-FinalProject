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

/*
//for Horuku
const dbConfig = process.env.DATABASE_URL;
*/
var db = pgp(dbConfig);

let cloudy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
cloudy[0] = "grey";
cloudy[1] = "gloom";
cloudy[2] = "fall";
cloudy[3] = "death";
cloudy[4] = "sadness";
cloudy[5] = "melancholy";
cloudy[6] = "calm";
cloudy[7] = "mellow";
cloudy[8] = "cloud";
cloudy[9] = "overcast";

let rainy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
rainy[0] = "rain";
rainy[1] = "drops";
rainy[2] = "water";
rainy[3] = "nature";
rainy[4] = "calm";
rainy[5] = "inside";
rainy[6] = "falling";
rainy[7] = "mellow";
rainy[8] = "flow";
rainy[9] = "wash";

let sunny = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
sunny[0] = "happy";
sunny[1] = "nature";
sunny[2] = "energetic";
sunny[3] = "move";
sunny[4] = "sun";
sunny[5] = "light";
sunny[6] = "shine";
sunny[7] = "hot";
sunny[8] = "clear";
sunny[9] = "glow";

let thunder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
thunder[0] = "thunder";
thunder[1] = "lightning";
thunder[2] = "boom";
thunder[3] = "crack";
thunder[4] = "metal";
thunder[5] = "rock";
thunder[6] = "flash";
thunder[7] = "fast";
thunder[8] = "bright";
thunder[9] = "dark";

let snow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
snow[0] = "chill";
snow[1] = "white";
snow[2] = "snow";
snow[3] = "christmas";
snow[4] = "relax";
snow[5] = "crystal";
snow[6] = "cold";
snow[7] = "freeze";
snow[8] = "flake";
snow[9] = "quiet";




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
			res.render('login',{
				isValid: ''
			});
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
	
	if(playlistID == undefined){
		songCascade(keywordPicker(weatherId));
	}
	else{
		res.render('home',{
			pLID: playlistID,
			guestUsername:'username',
			location: cityName,
			weatherId: weatherId,
			currTemp: curTemp,
			minTemp: minTemp,
			maxTemp: maxTemp,
		})
		playlistID = undefined;
	}
});


app.get('/weatherPage',function(req,res){
	//res.sendFile(path.join(__dirname+'/views/weatherPage.html'));
	res.render('weatherPage')
});
let client_id = "011752af6d22471880ead0a4a1e6b09b";
let client_secret = "c301ed02c7734ec1ac78c13da98980c0";

let basic = new Buffer.from(client_id + ':' + client_secret).toString('base64'); 
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
  console.log(keyword);
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

function keywordPicker(num) {
	var keywords = '';
	var random1 = Math.floor(Math.random() * (9 - 0 + 1));
	var random2 = Math.floor(Math.random() * (9 - 0 + 1));
	var random3 = Math.floor(Math.random() * (9 - 0 + 1));
	if ((200 <= num && num < 300) || (700 <= num && num < 800)) {
		keywords = thunder[random1]+' '+ thunder[random2] +' '+ thunder[random3];
	}
	else if ((300 <= num && num < 400 )|| (500 <= num && num < 600)) {
		keywords = rainy[random1]+' '+ rainy[random2] +' '+ rainy[random3];
	}
	else if (600 <= num && num< 700) {
		keywords = snow[random1]+' '+ snow[random2] +' '+ snow[random3];
	}
	else if (num == 800) {
		keywords = sunny[random1]+' '+ sunny[random2] +' '+ sunny[random3];
	}
	else if (801 <= num && num < 900) {
		keywords = cloudy[random1]+' '+ cloudy[random2] +' '+ cloudy[random3];
	}
	else{
		console.log("Weather ID error");
	}
	//console.log(keywords);
	return keywords;   // The function returns an array of size 3 with keywordsq
}

//localhost

app.listen(2000);
console.log('server up on port 2000');

/*
//heroku
app.listen(process.env.PORT);
*/