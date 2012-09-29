var socket = io.connect('http://localhost:3000');
$(document).ready(function(){
  if($('#dashboard').length > 0){
    socket.on('analyticsUpdate', function (data) {
      $('#dashboard .data').html('<p>Current User Count: ' + (data.currentUsers -1) + '</p>' + 
        '<p>Hover Count: ' + data.hoverCount + '</p>' +
        '<p>Product Count: ' + data.productCount + '</p>' +
        '<p>Cart Count: ' + data.cartCount + '</p>' +
        '<p>Purchase Count: ' + data.purchaseCount + '</p>');
      console.log(data);
    });
  }
});


  $(document).ready(function(){
  	var hoverStart='';
  	$('a').hover(function(){
  		hoverStart = new Date();
  	},
  	function(){
  		var hoverStop = new Date();
  		$(this).attr('href');
  		var hoverTime = (hoverStop - hoverStart) / 1000;
  		if(hoverTime > 0.250){
	  		socket.emit('analyticsHover', {url: $(this).attr('href'), time:hoverTime})
  		}
  	});
    $('a').click(function(){
      var hoverStop = new Date();
      $(this).attr('href');
      var hoverTime = (hoverStop - hoverStart) / 1000;
      if(hoverTime > 0.250){
        socket.emit('analyticsHover', {url: $(this).attr('href'), time:hoverTime})
      }
    });
  });