var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();

app.set('port', 3000);
app.use(cors());

var cnt = 0;
var responseData = {"dateStr":"", "count":cnt};
app.get("/count", function(req, res) {
    cnt++;
    var date = new Date();
    responseData = {
        "dateStr":date.getFullYear()+"-"+
            (date.getMonth()+1)+"-"+
            (date.getDate())+" "+
            (date.getHours())+":"+
            (date.getMinutes()),
        "count":cnt
    }
    res.end(JSON.stringify(responseData ) );
});

app.get("/receive/:localCount", (req, res) => {
    if(cnt > Number(req.params.localCount)) {
        res.end(JSON.stringify(responseData ) );
    } else {
        res.end("");
    }
});

http.createServer(app).listen(app.get('port'), function() {
    console.log(`running on server with http://localhost:${app.get('port')}`);
});
