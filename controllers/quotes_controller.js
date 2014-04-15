var debug = require('debug')('quotes_controller.js');
var util = require('util');
var models = require('./../models');

// Constructor
function QuotesController() {
}

// class methods
QuotesController.index = function(req, res) {
	models.Quote.find({}, function(error, quotes) {
		res.render('quotes/index', { quotes: quotes });
	});
};

QuotesController.show = function(req, res) {
	debug("called show on id: " + req.params.id);
	
	models.Quote.findOne( { _id: req.params.id }, function(error, quote) {
		debug(util.inspect(quote));
		res.render('quotes/show', { quote: quote });
	} );
	
};

QuotesController.new = function(req, res) {
	res.render('quotes/new', { quote: {} });
};

QuotesController.create = function(req, res) {
	debug("called create!");
	debug("request body: " + util.inspect(req.body));
	debug("test nodemon!");
	
	// create a new quote in the database
	// TODO!!!
	var new_id = 123;
	
	// redirect to show
	res.redirect("/quotes/" + new_id);
};

QuotesController.delete = function(req, res) {
	debug("called delete on id: " + req.params.id);

	// delete quote with req.params.id
	//TODO!!!

	// redirect to index
	res.redirect('/quotes');
};

QuotesController.random_quote = function(req, res) {
	models.Quote.findRandom(function (err, quote) {
		res.render('quotes/random', { quote: quote });
	})
};

// export the class
module.exports = QuotesController;