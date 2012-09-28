
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , server = require('http').createServer(app)
  , mongoose = require('mongoose');
  //, io = require('socket.io').listen(server);


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
require('./controllers/product')(app)


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


//Socket.io Stuffs
// var userCount = 0; 
// io.sockets.on('connection', function (socket) {
//     userCount = userCount+1;
//     console.log('A socket connected!');
//     socket.broadcast.emit('userUpdate', { count: userCount });
//     socket.on('my other event', function (data) {
//       console.log(data);
//     });
//     socket.on('disconnect', function () {
//       userCount = userCount-1;
//       socket.broadcast.emit('userUpdate', { count: userCount });
//     });
// });