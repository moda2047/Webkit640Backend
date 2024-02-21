const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.set("port", 3000);

//사칙연산 기능

const server = http.createServer();
server.listen(app.get("port"), () => {
  console.log("서버 실해중 httpL//localhost:" + app.get("port"));
});
