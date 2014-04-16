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
	models.Quote.findOne( { _id: req.params.id }, function(error, quote) {
		debug(util.inspect(quote));
		res.render('quotes/show', { quote: quote });
	} );
};

QuotesController.new = function(req, res) {
	res.render('quotes/new', { quote: {} });
};

QuotesController.create = function(req, res) {
	debug("request body: " + util.inspect(req.body));
	author = req.body.author
	quote = req.body.quote

	// create a new quote in the database
	var quote = new models.Quote({ author: author, quote: quote });
	quote.save(function (err, quote) {
		if (err) return console.log(err);
		debug(quote.to_s());
		// redirect to show
		res.redirect("/quotes/" + quote._id);
	});
};

QuotesController.delete = function(req, res) {
	debug("called delete on id: " + req.params.id);
	models.Quote.remove( { _id: req.params.id }, function(err) {
		// redirect to index
		res.redirect("/quotes");
	} );
};

QuotesController.random_quote = function(req, res) {
	
	models.Quote.count({}, function(err, count) {
		rand_nr = Math.floor(Math.random() * count);
		console.log("RANDOM: " + rand_nr);
		console.log("COUNT: " + count);
		
		models.Quote.find().select('_id author quote').limit(1).skip(rand_nr).exec(function (err, quotes) {
			console.log("Random quotes: " + util.inspect(quotes));
			quote = quotes[0];
			console.log(util.inspect(quote));
			res.render('quotes/random', { quote: quote });
		});	
	});	
};

// export the class
module.exports = QuotesController;