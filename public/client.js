// client.js


// document.getElementById("streamimage").src= location.host + ":8080/?action=stream"

var socket = io.connect(window.location.hostname + ':' + 80);
socket.emit()

function debug(data){
  console.log(data);
}

var joystick = nipplejs.create({
  zone: document.getElementById('joystick'),
  mode: 'static',
  position: { left: '50%', top: '50%' },
  color: 'grey',
  size: 200
});

joystick.on('move', function(evt, data) {
  //debug(data);
  socket.emit('move', data);
});

joystick.on('end', function(evt) {
  socket.emit('stop');
  console.log("Release");
});