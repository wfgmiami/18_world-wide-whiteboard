var socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('i have made a persistent two-way connection to the server!');
})

socket.on('draw', function(start, end, strokeColor){
  window.whiteboard.draw(start, end, strokeColor);
})

whiteboard.on('draw', function(start, end, strokeColor){
  socket.emit('draw', start, end, strokeColor);
})
