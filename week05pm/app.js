const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
// OS의 종류에 따라 경로 구분자 자동 변경
const path = require("path");

// set으로 속성 설정: port, viewEngine 등
app.set("port", process.env.PORT || 3000);
// || 는 삼항연산자의 약식 표현
// process.env.PORT ? process.env.PORT : 3000

// 뷰엔진 설정
console.log(path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views")); // 접두사
app.set("view engine", "ejs"); // 접미사

// static 미들웨어 설정 - html 파일 직접 접근
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/welcome", (req, res) => {
  console.log("GET - /home");
  res.write("<p>Welcome</p>");
  res.write("<script>console.log('welcome home page')</script>");
  res.end("<h1>Homepage</h1>");
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 --> ", `http://localhost:${app.get("port")}`);
});
