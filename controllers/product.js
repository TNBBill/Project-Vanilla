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
			Analytics.findOne({date: Analytics.currentDate()}, function(err, data){
				data.productCount = data.productCount + 1;
				data.save();
				socket.sockets.emit('analyticsUpdate', data);

			});
			res.render('product/show', {product: product, title: 'Product Page'});
			
		});

	});
};


