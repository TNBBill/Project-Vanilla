var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, Objectid = Schema.ObjectId;

var analyticsSchema = new Schema({
	date: {type: Date},
	productCount: {type: Number, default: 0},
	cartCount: {type: Number, default: 0},
	purchaseCount: {type: Number, default: 0}
});

var Analytics = mongoose.model('Analytics', analyticsSchema);
Analytics.currentDate = function(){
	var currentTime = new Date();
	var month = currentTime.getMonth();
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	return (month + "/" + day + "/" + year)
}

module.exports = Analytics