var debug = require('debug')('routes.js');
var util = require('util');

// Constructor
function QuotesController() {
}

// class methods
QuotesController.index = function(req, res) {
	res.render('quotes/index', { title: 'Quotes', quotes: [{ author: "Albert Einstein", quote: "Man muss die Welt nicht verstehen, man muss sich darin zurechtfinden"}] });
};

QuotesController.show = function(req, res) {
	debug("called show on id: " + req.params.id);
	res.render('quotes/show', { quote: {} });
};

QuotesController.new = function(req, res) {
	res.render('quotes/new', { quote: {} });
};

QuotesController.create = function(req, res) {
	debug("called create!");
	debug("request body: " + util.inspect(req))
	
	// create a new quote in the database
	// TODO!!!
	var new_id = 123;
	
	// redirect to show
	res.redirect("/quotes/" + new_id)
};

QuotesController.delete = function(req, res) {
	debug("called delete on id: " + req.params.id);

	// delete quote with req.params.id
	//TODO!!!

	// redirect to index
	res.redirect('/quotes');
};

// export the class
module.exports = QuotesController;