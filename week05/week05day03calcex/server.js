const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.set("port", 5000);
// 다른 서버 or, 다른 url 또는 port에서 접속 가능.
app.use(cors());

// 사칙연산이 기능
// REST api로 구현
// 클라이언트에서 Ajax로 접속.

const calcUrl = "/calc/:a/:b";
let a = 0;
let b = 0;

// 미들웨어에서 파라미터를 전역 변수에 저장
app.use(calcUrl, (req, res, next) => {
  console.log("미들웨어 호출!");
  a = Number(req.params.a);
  b = Number(req.params.b);
  next();
});

router.route(calcUrl).get((req, res) => {
  // 더하기
  let resultData = {
    result: a + b,
    method: "get",
    oper: "+",
    date: new Date(),
  };
  console.log(resultData);
  res.send(resultData);
});
router.route(calcUrl).delete((req, res) => {
  // 빼기
  let resultData = {
    result: a - b,
    method: "delete",
    oper: "-",
    date: new Date(),
  };
  console.log(resultData);
  res.send(resultData);
});
router.route(calcUrl).post((req, res) => {
  // 곱하기
  let resultData = {
    result: a * b,
    method: "post",
    oper: "*",
    date: new Date(),
  };
  console.log(resultData);
  res.send(resultData);
});
router.route(calcUrl).put((req, res) => {
  // 나누기
  let resultData = {
    result: a / b,
    method: "put",
    oper: "/",
    date: new Date(),
  };
  console.log(resultData);
  res.send(resultData);
});

// 서버 실행 전에 라우터 미들웨어 등록
app.use(router);
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 ... http://localhost:" + app.get("port"));
});
