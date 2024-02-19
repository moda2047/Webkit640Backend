function readJSON(filename) {
  return new Promise(function (fulfill, reject) {
    readFile("test.txt", "utf8").done(function (res) {
      try {
        fulfill(JSON.parse(res));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}

function okFn() {
  console.log("성공");
}

function failFn() {
  console.log("실패");
}

readJSON();
