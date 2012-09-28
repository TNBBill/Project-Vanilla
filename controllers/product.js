var Product = require('../models/product.js')

module.exports = function(app){
	app.get('/product', function(req, res){
		Product.find(function(err, products){
			res.send(products);	
		});
	});

	app.get('/product/new', function(req, res){
		new Product({name: 'Test', price: 1000}).save()
		res.send(true);
	});
};