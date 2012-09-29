 var socket = io.connect('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });

  });
   socket.on('userUpdate', function (data) {
    console.log(data);
  });

  socket.on('analyticsUpdate', function (data) {
    console.log(data);
  });