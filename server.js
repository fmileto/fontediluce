var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var bodyParser   = require('body-parser');
var session      = require('express-session');


// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

// routes ======================================================================
require('./routes/milestone.js')(app);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
