//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require("mongodb");

const dbUrl = "mongodb://localhost";
let vehicleDB = null;
let usersDB = null;
function connectDb() {
  MongoClient.connect(
    dbUrl,
    { useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;

      vehicleDB = client.db("vehicle");
      usersDB = client.db("users");
      console.log("DB 접속 성공!");
    }
  );
}

const express = require("express");
const app = express();
const http = require("http");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// 정적 폴더를 public으로 지정
app.use(express.static("public"));

app.get("/car", (req, res) => {
  console.log("GET - /car");
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  if (usersDB) {
    usersDB
      .collection("car")
      .find()
      .toArray(function (err, carList) {
        if (err) throw err;
        req.app.render("car_list", { carList }, (err2, html) => {
          if (err2) throw err;
          res.end(html);
        });
      });
  } else {
    res.end("<h1>Error: DB가 없습니다!</h1>");
  }
});

app.get("/car", (req, res) => {
  console.log("GET - /car");
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  if (vehicleDB) {
    vehicleDB
      .collection("car")
      .find()
      .toArray(function (err, carList) {
        if (err) throw err;
        req.app.render("car_list", { carList }, (err2, html) => {
          if (err2) throw err;
          res.end(html);
        });
      });
  } else {
    res.end("<h1>Error: DB가 없습니다!</h1>");
  }
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("서버 실행 중 => http://localhost:3000");
  connectDb();
});
