var Analytics = require('../models/analytics.js')

module.exports = function(app, socket){
	app.get('/analytics/new', function(req, res){
		console.log(Analytics.currentDate);
		new  Analytics({date: Analytics.currentDate()}).save();
		res.send(true);
	});

};


