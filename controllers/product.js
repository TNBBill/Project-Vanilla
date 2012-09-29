var Product = require('../models/product.js')
var Analytics = require('../models/analytics.js')

module.exports = function(app, socket){
	app.get('/product', function(req, res){
		Product.find({},'name', {skip: 0, limit: 20}, function(err, products){
			res.render('product/list', {products: products, title: 'Products Page'});

		});
	});

	app.get('/product/:id', function(req, res){
		Product.findOne({_id: req.params.id}, function(err, product){
			socket.analyticData.productCount++;
			socket.sockets.emit('analyticsUpdate', socket.analyticData);
			res.render('product/show', {product: product, title: 'Product Page'});
			
		});

	});
	
};


