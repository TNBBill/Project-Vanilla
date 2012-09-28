var Product = require('../models/product.js')

module.exports = function(app){
	app.get('/product', function(req, res){
		Product.find(function(err, products){
			res.render('product/list', {products: products, title: 'Products Page'});
		});
	});

	app.get('/product/:id', function(req, res){
		Product.findOne({_id: req.params.id}, function(err, product){
			res.render('product/show', {product: product, title: 'Product Page'});
		});

	});
};


