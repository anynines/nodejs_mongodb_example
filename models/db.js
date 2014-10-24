var mongoose = require('mongoose')
var debug = require('debug')('models/db.js');
var models = require('../models');

// Constructor
function Db() {
	this.connection = null;
}

// class methods
Db.prototype.connect = function() {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(this.read_mongodb_url_from_env(), options);
	console.log('Connected to the database');

	this.connection = mongoose.connection;
	this.connection.on('error', console.error.bind(console, 'connection error:'));
	return this.connection;
};

Db.prototype.read_mongodb_url_from_env = function() {
	try {
		var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
		debug(JSON.stringify(vcap_services));
		mongo_service = vcap_services['a9s-mongodb'][0];
		debug(JSON.stringify(mongo_service));
		mongo_user = mongo_service.credentials.username;
		mongo_pass = mongo_service.credentials.password;
		mongo_host = mongo_service.credentials.hosts[0];
		mongo_db = mongo_service.credentials.default_database;

		mongo_url = null
		if(mongo_user == null && mongo_pass == null) {
			mongo_url = "mongodb://" + mongo_host + "/" + mongo_db;
		} else {
			mongo_url = "mongodb://" + mongo_user + ":" + mongo_pass + "@" + mongo_host + "/" + mongo_db;
		}

		debug(JSON.stringify(mongo_url));
		return mongo_url;
	} catch (err) {
	    console.log("An error occured while loading the MongoDB credentials from the env:", err)
		console.log("Please ensure that you have bound a MongoDB service instance to the application!")
		throw err
	}
};

Db.prototype.insert_seeds_if_needed = function() {
	models.Quote.count({}, function(err, count) {

		if(count===0) {
			console.log("Inserting seeds into the database!");
			var seeds = models.seeds;
			for(var i=0; i< seeds.length; i++) {
				var quote = new models.Quote({ author: seeds[i].author, quote: seeds[i].quote });
				quote.save(function (err, quote) {
					if (err) return console.log(err);
				});
			}
		} else {
			console.log("Found data. Skipping seeds section!");
		}
	});
};

// export the class
module.exports = Db;
