const MongoClient = require("mongodb").MongoClient;

const dbUrl = "mongodb://localhost";
let db = null;
function connectDb() {
  MongoClient.connect(
    dbUrl,
    { useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;

      db = client.db("vehicle");
      console.log("DB 접속 성공!");
    }
  );
}

const express = require("express");
const app = express();
const http = require("http");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/car", (req, res) => {
  console.log("GET - /car");
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  if (db) {
    db.collection("car")
      .find()
      .toArray(function (err, carList) {
        req.app.render("car_list", { carList }, (err, html) => {
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
