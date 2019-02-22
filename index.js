var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    const jsonMsg = JSON.parse(msg);
    const { message, droidId } = jsonMsg;
    if (message === null || droidId === null) {
      io.emit('chat message', "We cannot talk")
    }
    switch (message) {
      case 'hello':
        io.emit('chat message', { "message": "Are you droid?" });
        break;
      case 'yes':
        io.emit('chat message', { "message": "8+9" });
        break;
      case '17':
        io.emit('chat message', { "message": "BRAVO" });
        break;
      default:
        io.emit('chat message', "Study more");
        break;
    }
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
