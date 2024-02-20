const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const expressErrorHandler = require("express-error-handler");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

//set으로 초기설정
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//미들웨어이다.
app.use("/", express.static("public"));

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
const users = [
  { id: "user01", password: "user123", phone: "010-1111-1111", name: "홍길동" },
  {
    id: "user02",
    password: "user1234",
    phone: "010-1111-2222",
    name: "김길동",
  },
  { id: "admin", password: "admin123", phone: "010-1111-3333", name: "관리자" },
];

function findOne(data, callback) {
  if (data.id == null || data.password == null) {
    callback("Error - id 또는 pass가 없습니다!", null);
    return;
  }

  for (let i = 0; i < users.length; i++) {
    console.log(data.id == users[i].id);
    if (data.id === users[i].id && data.password === users[i].password) {
      callback(null, users[i]);
      return;
    }
  }
  callback(null, null);
}

router.route("/member/logout").get((req, res) => {
  if (req.session.user) {
    req.session.user = undefined;
  }
  res.redirect("/member/login.html");
});

router.route("/member/login").post((req, res) => {
  console.log("POST - /member/login");
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  const data = {
    id: req.body.id,
    password: req.body.password,
  };
  findOne(data, (err, result) => {
    // JS에서는 undefined, null, 0이 모두 false이다.
    if (err) {
      console.log(err);
      res.end("<h2>로그인 결과 없습니다!</h2>");
      return;
    }
    if (result == null) {
      res.end("<h2>로그인 결과 없습니다!</h2>");
      return;
    }
    if (req.session.user) {
      console.log("이미 로그인 되어 상품 페이지로 이동 함.");
      res.redirect("/public/product.html");
    } else {
      // 세션 저장
      req.session.user = result;

      console.log("결과: ", result);
      res.write("<h2>로그인 성공</h2>");
      res.write('<a href="/shop/list">상품목록으로 이동</a>');
      res.write('<a href="/member/logout">로그아웃</a>');

      // Object와 JSON은 다르다. JSON은 문자열, Object 객체
      //res.write(JSON.stringify(result));
      res.end();
      return;
    }
  });
});

router.route("/shop/list").get((req, res) => {
  if (req.session.user === undefined) {
    console.log("로그인정보가 없다");
    res.redirect("/member/login.html");
    return;
  }
  req.app.render("product", {}, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(html);
  });
});

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
