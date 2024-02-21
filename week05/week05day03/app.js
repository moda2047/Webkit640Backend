const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const expressErrorHandler = require("express-error-handler");
// 쿠키, 세션 설정
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

// 파일업로드
const multer = require("multer");

// 쿠키, 세션 미들웨어
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

// 6주차 Servlet 시작전 자바 공부 복습
// JDBC(SQL 포함), 컬렉션(Set, Map, List), 인터페이스, 전략패턴, MVC ...

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // 확장자 지정
// static 으로 직접 접근 가능
app.use("/", express.static("public"));
// 나중에 Ajax에 필요한 처리
app.use(cors());

// 파라미터 전송을 위해 bodyParser 미들웨어 설정
// 로그인, 장바구니 구현을 위한 쿠키, 센션 미들웨어 설정
// 로그인 기능 구현
// 파일업로드를 위한 설정
// 에러 페이지 처리

// body-parser는 직접 설치하거나 express 제공.
// body-parser를 사용해서 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
// body-parser를 사용해서 application/json 파싱
app.use(bodyParser.json());

// router를 사용하면 차후에 파일을 콤포넌로 분리할 때 유리함.
router.route("/home").get((req, res) => {
  const data = { title: "홈페이지입니다!" };
  req.app.render("home", data, (err, html) => {
    res.end(html);
  });
});

// 서버 작업에 집중
// 테스트는 postman을 활용한다.
// 서버가 완성이 되면 클라이언트 페이지 구현
// estp
// ~tj경향들이 코딩 잘한다??

// 로그인 테스트용 Sample 정보
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
// TDD - 테스트 주도 개발
// 로그인 요청 기능
// id, password가 일치하면 session에 등록.
// post 방식은 브라우저 url로 바로 접근 불가능.
// FORM의 method를 post로 처리, postman으로 테스트.

// 요청 정보와 저장 데이터를 비교하는 기능
// 기능 == function == 함수 == behavior == method == 프로시저
// === 완전히 같은거, == 비슷한거(타입은 같아도 의미가 같다면 true)
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
      res.write('<a href="/shop">상품목록으로 이동</a> | ');
      res.write('<a href="/member/logout">로그아웃</a>');
      // Object와 JSON은 다르다. JSON은 문자열, Object 객체
      // res.write(JSON.stringify(result));
      res.end();
      return;
    }
  });
});

let carList = [
  { id: "p001", name: "SONATA", maker: "HYUNDAI", price: 2400, year: 2018 },
  { id: "p022", name: "SORENTO", maker: "KIA", price: 3400, year: 2021 },
  { id: "p033", name: "S80", maker: "VOLVO", price: 4500, year: 2016 },
  { id: "p104", name: "S540", maker: "BENZ", price: 7200, year: 2020 },
];

// 아이디 중복 검사 기능
router.route("/shop/idcheck/:userid").get((req, res) => {
  // 아이디 중복검사 기능 구현
  let check = false;
  // 중복된 id가 있다면 true로 변경
  const userid = req.params.userid;

  carList.forEach((car) => {
    if (car.id === userid) {
      check = true;
      return;
    }
  });

  res.send(check);
});

// 파일 업로드에 필요한 설정
app.use("/uploads", express.static("uploads"));
// <상단에 bodyPaser 미들웨어 준비>
// multer 미들웨어 사용: 미들웨어 사용 순서
// body-parser -> multer -> router 순으로 실행
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    // 파일명 중복을 방지하기 위한 처리
    // Date.now() <-- 타임스템프
    let index = file.originalname.lastIndexOf(".");
    let newFileName = file.originalname.substring(0, index);
    newFileName += Date.now();
    newFileName += file.originalname.substring(index);
    callback(null, newFileName);
  },
});

// 파일 제한: 10개, 1G 이하
var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

// 상품 등록 POST
router.route("/shop").post(upload.array("photo", 1), (req, res) => {
  console.log("POST - /shop");
  //console.dir(req.body);
  //carList.push(req.body);
  //res.redirect("/shop");

  // res.writeHead(200, {'Content-Type':"text/html; charset=UTF-8"})
  // res.write(JSON.stringify(req.body));
  // res.end("상품 등록 완료!");

  // 로그인 된 사용자만 저장 가능.
  if (req.session.user === undefined) {
    console.log("로그인 정보가 없다!");
    res.redirect("/member/login.html");
    return;
  }

  try {
    var files = req.files;
    console.log(files);
    console.log(req.body);
    carList.push({
      id: req.body.id,
      name: req.body.name,
      maker: req.body.maker,
      price: req.body.price,
      year: req.body.year,
      filename: files.filename,
      originalname: files.originalname,
    });
  } catch {
    console.log("파일 전송 오류!");
  }

  res.redirect("/shop");
});

// 상품 목록 GET
router.route("/shop").get((req, res) => {
  // session에 사용자 정보가 있다면 보여준다.
  // 그것이 없다면 다시 로그인 페이지로 redirect
  if (req.session.user === undefined) {
    console.log("로그인 정보가 없다!");
    res.redirect("/member/login.html");
    return;
  }
  req.app.render("product", { carList }, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(html);
  });
});

// 제품 상세보기 페이지
router.route("/shop/detail/:id").get((req, res) => {
  // session에 사용자 정보가 있다면 보여준다.
  // 그것이 없다면 다시 로그인 페이지로 redirect
  if (req.session.user === undefined) {
    console.log("로그인 정보가 없다!");
    res.redirect("/member/login.html");
    return;
  }

  let car = {};
  let index = carList.findIndex((car) => {
    console.log(car);
    return car.id === req.params.id;
  });
  if (index != -1) {
    car = carList[index];
  }
  console.log(car);
  req.app.render("product_detail", { car }, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(html);
  });
});

// 제품 삭제
router.route("/shop/delete/:id").get((req, res) => {
  // session에 사용자 정보가 있다면 보여준다.
  // 그것이 없다면 다시 로그인 페이지로 redirect
  if (req.session.user === undefined) {
    console.log("로그인 정보가 없다!");
    res.redirect("/member/login.html");
    return;
  }

  let car = {};
  let index = carList.findIndex((car) => {
    console.log(car);
    return car.id === req.params.id;
  });
  if (index != -1) {
    // 적용
    carList.splice(index, 1);
  }

  // 목록으로 새로고침
  res.redirect("/shop");
});

// 제품 수정 완료
router.route("/shop/modify").post((req, res) => {
  // session에 사용자 정보가 있다면 보여준다.
  // 그것이 없다면 다시 로그인 페이지로 redirect
  if (req.session.user === undefined) {
    console.log("로그인 정보가 없다!");
    res.redirect("/member/login.html");
    return;
  }

  // 수정할 대상 찾기
  let car = {};
  let index = carList.findIndex((car) => {
    console.log(car);
    return car.id === req.body.id;
  });
  if (index != -1) {
    car = carList[index];
    // 적용
    carList[index] = {
      id: req.body.id,
      name: req.body.name,
      maker: req.body.maker,
      price: req.body.price,
      year: req.body.price,
    };
  }

  // 목록으로 새로고침
  res.redirect("/shop");
});

// 제품 수정 페이지로 forward
router.route("/shop/modify/:id").get((req, res) => {
  // session에 사용자 정보가 있다면 보여준다.
  // 그것이 없다면 다시 로그인 페이지로 redirect
  if (req.session.user === undefined) {
    console.log("로그인 정보가 없다!");
    res.redirect("/member/login.html");
    return;
  }

  let car = {};
  let index = carList.findIndex((car) => {
    console.log(car);
    return car.id === req.params.id;
  });
  if (index != -1) {
    car = carList[index];
  }
  console.log(car);
  req.app.render("product_modify", { car }, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(html);
  });
});

// router 미들웨어 등록 전에 router 설정 완료 해야 함.
app.use(router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res) {
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>')
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
