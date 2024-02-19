const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

// port , viewEngine 등을 set으로 설정하는 것이다.
app.set("port", 3000);

app.get("/welcome", (req, res) => {
  res.end("GET - /home");
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중", `http://localhost:${app.get("port")}`);
});
