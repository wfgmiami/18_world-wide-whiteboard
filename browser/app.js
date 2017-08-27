var socket = io(window.location.origin);

socket.on('connect', function(){

  socket.emit('joinRoom', window.location.pathname);

  socket.on('drawHistory', function(draws){

    draws.forEach( function(drawObj){
      whiteboard.draw(drawObj.start, drawObj.end, drawObj.color)
     })

  })

  socket.on('draw', function(start, end, strokeColor){
    window.whiteboard.draw(start, end, strokeColor);
  })


  whiteboard.on('draw', function(start, end, strokeColor){
    socket.emit('draw', start, end, strokeColor);
  })

})


