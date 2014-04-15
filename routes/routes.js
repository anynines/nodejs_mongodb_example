var express = require('express');
var router = express.Router();
var quotes_controller = require('./../controllers/quotes_controller')

router.get('/', function(req, res) {
	quotes_controller.random_quote(req,res);
});

router.get('/random', function(req, res) {
	quotes_controller.random_quote(req,res);
});

router.get('/quotes', function(req, res) {
	quotes_controller.index(req,res);
});

router.get('/quotes/new', function(req, res) {
	quotes_controller.new(req, res);
});

router.get('/quotes/:id', function(req, res) {
	quotes_controller.show(req, res);
})

router.delete('/quotes/:id', function(req, res) {
	quotes_controller.delete(req, res);
});

router.post('/quotes/create', function(req, res) {
	quotes_controller.create(req, res);
});

module.exports = router;
