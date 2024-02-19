// week05ex04http.js

const http = require("http");

const port = 3000;
// 기본 요청 이벤트 핸들러
const server = http.createServer();

// 이벤트 핸들러 설정
server.on("request", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  response.end("<h1>안녕 세상!</h1>");
});

server.on("connection", (socket) => {
  console.log(socket);
});

server.on("close", (socket) => {
  console.log("close", socket);
});

// 포트 지정
server.listen(port, () => {
  console.log("서버 실행 중 - http://localhost:" + port);
});
