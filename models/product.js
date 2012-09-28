var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, Objectid = Schema.ObjectId;

var productSchema = new Schema({
	name: {type: String},
	description: {type: String},
	price: {type: Number}
});

module.exports = mongoose.model('Product', productSchema);