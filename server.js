var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

// set views in app
app.set('views', __dirname + '/app');
app.use(express.static(__dirname + '/app'));
// render html with ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render('index', { title: 'ejs' });
});

// routes ======================================================================
require('./routes/milestone.js')(app);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
