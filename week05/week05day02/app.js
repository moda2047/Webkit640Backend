const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
var expressErrorHandler = require("express-error-handler");

//set으로 초기설정
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//미들웨어이다.
app.use("/public", express.static("public"));

app.use(cors());
//파라미터 전송을 위해 bodyParser 설정을 해야한다.
// 로그인, 장바구니 구현을 위한 쿠키, 세션 미들웨어 설정
// 파일 업로드를 위한 설정
//에러 페이지 처리

//body-parser를 사용해서 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

//body-parser를 사용해서 application/json 파싱
app.use(bodyParser.json());

router.route("/home").get((req, res) => {
  const data = { title: "홈페이지입니다!" };
  req.app.render("home", data, (err, html) => {
    res.end(html);
  });
});
//로그인 세션방식

// router 미들웨어 등록 전에 router 설정 완료 해야한다.
app.use(router);
// 등록되지 않은 패스에 대해 페이지 오류 응답
// app.all("*", function (req, res) {
//   res.status(404).send("<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>");
// });

//모든 라우터 처리 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`서버 실행 중 ... http://localhost:${app.get("port")}`);
});
