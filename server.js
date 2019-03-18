var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


//display_login
app.get('/', function(req,res){
	res.render('test');
});

app.listen(3000);
console.log('server up on port 3000');