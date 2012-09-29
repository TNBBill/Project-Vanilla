module.exports = function(app, socket){
	app.post('/user/cart', function(req, res){
		socket.analyticData.cartCount++;
		res.render('cart/index', {title: 'Cart'});
	});
	app.get('/user/cart', function(req, res){
		res.render('cart/index', {title: 'Cart'});
	});

};
