const fs = require("fs");

function fulfill() {
  console.log("성공");
}

function reject() {
  console.log("실패");
}

function task() {
  console.log("할 일");
  return new Promise(function (fulfill, reject) {
    try {
      fulfill();
    } catch {
      reject();
    }
  });
}

task().then(fulfill, reject);
