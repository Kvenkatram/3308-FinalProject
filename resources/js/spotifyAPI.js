var client_id = "011752af6d22471880ead0a4a1e6b09b";
var client_secret = "c301ed02c7734ec1ac78c13da98980c0";

let basic = new Buffer(client_id + ':' + client_secret).toString('base64'); 
var express = require('express');
var app = express();
var Spotify = require('node-spotify-api');
//var keyword = "bread";
var refreshToken = "AQCbz2qFhfgBMIuCCcdho8kxSZRqStiUXJk-YhChSiLroQPO9kuTlH1PSvM9x48GGOzTARmv_GW2SrPyv1nBIJWmybWHWQEiMPiE0RC4hzrALZXPzj9IsbypycXqVKJsdd2Img";
var aToken;
var request = require('request');
var playlistID;
var refreshHeaders = {
    'Authorization': 'Basic '+ basic,
    'Content-Type': 'application/x-www-form-urlencoded'
};

var refreshString = 'grant_type=refresh_token&refresh_token=' + refreshToken;

var refreshOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: refreshHeaders,
    body: refreshString
};

//var dataString = '{"name":"'+keyword+'", "public":true}';
var dataString;
let spotify = new Spotify({
  id: client_id,
  secret: client_secret
});
var uris = "uris=";

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
