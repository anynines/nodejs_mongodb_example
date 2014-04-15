var mongoose = require('mongoose')
	, random = require('mongoose-random')
	, Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  	author: {type : String, trim: true},
  	quote: {type : String, trim: true}
})
QuoteSchema.plugin(random());

QuoteSchema.methods = {
	to_s: function () {
	  var str = this.author + " : " + this.quote
	  return str
	}
}

var Quote = module.exports = mongoose.model('Quote', QuoteSchema)