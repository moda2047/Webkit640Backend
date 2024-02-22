var http = require("http");
var express = require("express");
var app = express();
var socketio = require("socket.io");
var cors = require("cors");
var static = require("serve-static");
var path = require("path");

app.use(cors());
app.use(express.static("public"));

var server = http.createServer(app).listen(3000, function () {
  console.log("서버가 시작되었습니다. http://127.0.0.1:" + 3000);
});

var io = socketio(server);

io.sockets.on("connection", function (socket) {
  console.log("클라이언트 소켓 접속 성공!");
  //console.log('connection info: ', socket);
  //console.log('connection info: ', socket.request);

  socket.on("message", function (data) {
    console.log("클라이언트 메세지:", data);
  });
  socket.emit("news", { sender: "server", message: "오늘의 날씨" });
});
