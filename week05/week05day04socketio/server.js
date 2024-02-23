var http = require("http");
var express = require("express");
var app = express();
var socketio = require("socket.io");
var cors = require("cors");
var static = require("serve-static");
var path = require("path");
const { SlowBuffer } = require("buffer");

app.use(cors());
app.use(express.static("public"));

var server = http.createServer(app).listen(3000, function () {
  console.log("서버가 시작되었습니다. http://127.0.0.1:" + 3000);
});

var io = socketio(server);

const users = {};

io.sockets.on("connection", function (socket) {
  console.log("클라이언트 소켓 접속 성공!");

  socket.on("login", function (data) {
    console.log("login data:", data);
    socket.userName = data.userName;
    users[data.userId] = socket;
  });

  socket.on("message", function (data) {
    //console.log('클라이언트 메세지:', data);
    if (data.recepient === "All") {
      io.sockets.emit("message", data);
    } else {
      // 개인에게 귓속 말 기능으로 보내기 (숙제)
    }
  });

  socket.on("disconnect", function () {
    console.log("클라이언트 접속 해제 됨!");
    io.sockets.emit("user disconnected");
  });
});
