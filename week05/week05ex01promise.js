function fulfill() {
  console.log("성공");
}

function reject() {
  console.log("실패");
}

function tast() {
  console.log("할 일");
}

new Promise(task).then(fulfill, reject);
