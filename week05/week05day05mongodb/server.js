const mongojs = require("mongojs");

const db = mongojs("vehicle", ["car"]);

db.car.find(function (er, data) {
  console.log(data);
});
