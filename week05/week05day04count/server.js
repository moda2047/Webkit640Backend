var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();

app.set('port', 3000);
app.use(cors());
app.use("/", express.static("public"));

var messages = [];

app.get("/send", function(req, res) {
    var date = new Date();
    var message = {
        "dateStr":date.getFullYear()+"-"+
            (date.getMonth()+1)+"-"+(date.getDate())+" "+
            (date.getHours())+":"+(date.getMinutes())+":"+
            (date.getSeconds()),
        "sender": req.query.sender,
        "message": req.query.message
    }
    messages.push(message);
    console.log(messages);
    res.end();
});

app.get("/receive", (req, res) => {
    var responseData = {total:0, messages:[]};
    var index = messages.length;
    if(index > Number(req.query.size)) {
        responseData = {
            total: messages.length,
            messages: messages.slice(Number(req.query.size))
        };
        res.end(JSON.stringify(responseData ) );
    } else {
        res.end("");
    }
});

http.createServer(app).listen(app.get('port'), function() {
    console.log(`running on server with http://localhost:${app.get('port')}`);
});
