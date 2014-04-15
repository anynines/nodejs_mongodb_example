var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var debug = require('debug')('app.js');
var util = require('util');
var models = require('./models');


var routes = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layout');
if (app.get('env') === 'production') {
	app.enable('view cache'); // only cache views in production env
}
//app.set('partials', {header: "includes/header"});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
// read the mongodb url included in the VCAP_SERVICES env JSON hash
var read_mongodb_url_from_env = function() {
	var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
	mongo_url = vcap_services['mongodb-2.0'][0].credentials.url;
	debug(JSON.stringify(mongo_url));
	return mongo_url;
}

// initialize mongodb connection
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(read_mongodb_url_from_env(), options);
	console.log('Connected to the database');
}
connect();
*/
var db_manager = new models.Db();
var db = db_manager.connect();

/*
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
*/

db.once('open', function callback () {
	var alberts_quote = new models.Quote({ author: "Albert Einstein", quote: "E = m*c^2" });
	var quote2 = new models.Quote({ author: "Henry Ford", quote: "Wenn die Bürger unser Finanzsystem verstehen würden, hätten wir eine Revolution vor morgen früh." });
	alberts_quote.save(function (err, alberts_quote) {
		if (err) return console.error(err);
		debug(alberts_quote.to_s());
	});
	
	quote2.save(function (err, quote2) {
		if (err) return console.error(err);
	});
	
	models.Quote.find( function ( err, quotes ){
		/*
		for(var i = 0; i<quotes.length; i++) {
			debug(util.inspect(quotes[i]));
		}
		*/
	});
});




module.exports = app;
