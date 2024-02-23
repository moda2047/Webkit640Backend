const MongoClient = require("mongodb").MongoClient;

const dbUrl = "mongodb://localhost";
MongoClient.connect(dbUrl, function (err, client) {
  if (err) throw err;

  let db = client.db("vehicle");
  console.log(db);
});
