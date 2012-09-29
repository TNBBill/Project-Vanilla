
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , server = require('http').createServer(app)
  , mongoose = require('mongoose')
  , io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect('mongodb://localhost/vanilla')
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./controllers')(app)
require('./controllers/product')(app, io)
require('./controllers/analytics')(app, io)
require('./controllers/cart')(app, io)


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


//Socket.io Stuffs
io.analyticData = {hoverCount: 0, productCount: 0, cartCount: 0, purchaseCount: 0, currentUsers: 0};
io.sockets.on('connection', function (socket) {
    io.analyticData.currentUsers++;
    io.sockets.emit('analyticsUpdate', io.analyticData);
    socket.on('analyticsHover', function (data) {
      io.analyticData.hoverCount++;
      io.sockets.emit('analyticsUpdate', io.analyticData);
    });
    socket.on('disconnect', function () {
      io.analyticData.currentUsers--;
      io.sockets.emit('analyticsUpdate', io.analyticData);
    });
});

