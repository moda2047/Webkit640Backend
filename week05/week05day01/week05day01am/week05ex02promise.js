var num = 0;

function task1(fullfill, reject) {
  console.log("Task1 시작");

  setTimeout(function () {
    num = 1004;
    fullfill("Task1 결과", num);
  }, 300);
  console.log("Task1 끝", num);
}

function fullfilled(result, num) {
  console.log("fullfiled : ", result, num);
}

function rejected(err) {
  console.log("rejected : ", err);
}

new Promise(task1).then(fullfilled, rejected);
