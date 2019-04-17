// client.js

// (function() {
//     var socket = io.connect(window.location.hostname + ':' + 3000);
//     function start(){
//         socket.emit('start');
//       }

//       function stop(){
//         socket.emit('stop');
//       }
// }());

var socket = io.connect(window.location.hostname + ':' + 3000);
socket.emit()
function start(){
    socket.emit('start');
  }

  function stop(){
    socket.emit('stop');
  }

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