var five = require("johnny-five"),
  board = new five.Board({
    repl: false,
    port: "/dev/ttyUSB0"
  });

var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html')
});

var right_motor;
var left_motor;

board.on("ready", function () {

  right_motor = new five.Motor({
    pins: {
      pwm: 9,
      dir: 8
    },
    invertPWM: true
  });

  left_motor = new five.Motor({
    pins: {
      pwm:11,
      dir: 10
    },
    invertPWM: true
  });

  // board.repl.inject({
  //   right_motor: right_motor,
  //   left_motor: left_motor
  // });

});

var nJoyX; //Joysitck X Input
var nJoyY; //Joysitck y Input

var nMotMixL; // Motor Left Mixed output
var nMotMixR; // Motor Right Mixed output

var fPivYLimit = 32.0; // Pivot Action Threshold

var nMotPremixL; // Motor Left Premixed Output
var nMotPremixR; // Motor Right Premixed Output

var nPivSpeed; // Pivot Speed
var fPivScale; // Balance scale B/W drive and pivot

io.on('connection', function(client) {
  client.on('join', function(handshake) {
    console.log(handshake);
  });

  client.on('start', function() {
    right_motor.forward(100);
    left_motor.forward(100);
  });

  client.on('stop', function() {
    // console.log("stop");
    right_motor.stop();
    left_motor.stop();
  });

  client.on('move', function(data) {
    // console.log(data);
    //console.log("x:", data.instance.frontPosition.x, "y:", data.instance.frontPosition.y);

    nJoyX = data.instance.frontPosition.x;
    nJoyY = data.instance.frontPosition.y;

    // Calculate Drive Turn output due to Joystick X input
    if (nJoyY >= 0) {
      // Forward
      nMotPremixL = (nJoyX>=0)? 127.0 : (127.0 + nJoyX);
      nMotPremixR = (nJoyX>=0)? (127.0 - nJoyX) : 127.0;
    } else {
      // Reverse
      nMotPremixL = (nJoyX>=0)? (127.0 - nJoyX) : 127.0;
      nMotPremixR = (nJoyX>=0)? 127.0 : (127.0 + nJoyX);
    }

    // Scale Drive output due to Joystick Y input (throttle)
    nMotPremixL = nMotPremixL * nJoyY/128.0;
    nMotPremixR = nMotPremixR * nJoyY/128.0;

    // Now calculate pivot amount
    // - Strength of pivot (nPivSpeed) based on Joystick X input
    // - Blending of pivot vs drive (fPivScale) based on Joystick Y input
    nPivSpeed = nJoyX;
    fPivScale = (Math.abs(nJoyY)>fPivYLimit)? 0.0 : (1.0 - Math.abs(nJoyY)/fPivYLimit);

    // Calculate final mix of Drive and Pivot
    nMotMixL = (1.0-fPivScale)*nMotPremixL + fPivScale*( nPivSpeed);
    nMotMixR = (1.0-fPivScale)*nMotPremixR + fPivScale*(-nPivSpeed);

    nMotMixL = nMotMixL * 1.8;
    nMotMixR = nMotMixR * 1.8;

    if (nMotMixL < 0) {
      right_motor.forward(Math.abs(nMotMixL));
    } else {
      right_motor.reverse(nMotMixL);
    }

    if (nMotMixR < 0) {
      left_motor.forward(Math.abs(nMotMixR));
    } else {
      left_motor.reverse(nMotMixR);
    }

    // console.log("R output:",  nMotMixR, "L output:",  nMotMixL)
  });
});

const port = process.env.PORT || 80;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);