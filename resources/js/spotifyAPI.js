let client_id = "011752af6d22471880ead0a4a1e6b09b";
let client_secret = "c301ed02c7734ec1ac78c13da98980c0";

let basic = new Buffer(client_id + ':' + client_secret).toString('base64'); 
let express = require('express');
let app = express();
let Spotify = require('node-spotify-api');
//var keyword = "bread";
let refreshToken = "AQCbz2qFhfgBMIuCCcdho8kxSZRqStiUXJk-YhChSiLroQPO9kuTlH1PSvM9x48GGOzTARmv_GW2SrPyv1nBIJWmybWHWQEiMPiE0RC4hzrALZXPzj9IsbypycXqVKJsdd2Img";
let aToken;
let request = require('request');
let playlistID;
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
        let dS = dataString;
        var playlistHeaders = {
            'Authorization': 'Bearer ' + aToken,
            'Content-Type': 'application/json'
        };
        var playlistOptions = {
            url: 'https://api.spotify.com/v1/users/cfg0osr6p8on2rewhju2n2z3z/playlists',
            method: 'POST',
            headers: playlistHeaders,
            body: dS
        };
        request(playlistOptions,playlistCallback);
    }
    else{
      console.log(response.statusCode);
    }
}
