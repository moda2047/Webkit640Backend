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

// 사용자 정의 미들웨어 추가 - 인코딩 설정
// 모든 요청에 영향을 준다.
app.use((req, res, next) => {
  console.log("사용자 정의 미들에서 실행");
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  //미들웨어 실행 후 다음 요청
  next();
});
// 다른 미들웨어 추가
app.use((req, res, next) => {
  console.log("추가된 미들웨어 실행");
  req.adminName = "김길동";
  //미들웨어 실행 후 다음 요청
  next();
});

app.get("/welcome", (req, res) => {
  console.log("GET - /welcome");
  res.write("<p>Welcome</p>");
  res.write("<script>console.log('welcome home page')</script>");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>Homepage</h1>");
  res.write("<h3>어서오세요!</h3>");
  res.write('<a href="http://www.naver.com">Naver로 이동</a>');
  res.write("</html>");
  res.write("</html>");
  res.end();
});

app.get("/test", (req, res) => {
  // 미들웨어에서 추가된 이름 사용.
  res.write("관리자 이름: " + req.adminName);
  res.end("<h1>테스트 page</h1>");
});

app.get("/home", (req, res) => {
  console.log("GET - /home");
  // ejs 템플릿 뷰엔진 렌더링 접두사 접미사를 생략한 파일명만
  app.render("home", { data: "박길동" }, (err, html) => {
    res.end(html);
  });
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 --> ", `http://localhost:${app.get("port")}`);
});
