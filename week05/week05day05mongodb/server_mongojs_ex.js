const mongojs = require("mongojs");
const db = mongojs("vehicle", ["car"]);
const express = require("express");
const http = require("http");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/car", (req, res) => {
  db.car.find(function (er, carList) {
    req.app.render("car_list", { carList }, (err, html) => {
      res.end(html);
    });
  });
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("서버 실행 중 http://localhost:3000");
});
