const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.set("port", process.env.PORT || 3000);

console.log(path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors());
// bodyParser 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test4", (req, res) => {
  console.log("GET - /test4");
  // let user = req.query.user;
  // let age = req.query.age;
  // let userObj = {user, age};
  // console.log(userObj);
  // res.send(userObj);
  console.log(req.query);
  res.send(req.query);
});

app.post("/test5", (req, res) => {
  console.log("GET - /test5");
  console.log(req.body);
  res.send(req.body);
});

// path parameter
// test6/KIM/Programmer
app.get("/test6/:user/:job", (req, res) => {
  console.log("GET - /test6/:user/:job");
  console.log(req.params);
  console.log(req.params.user);
  res.send(req.params);
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 --> ", `http://localhost:${app.get("port")}`);
});
