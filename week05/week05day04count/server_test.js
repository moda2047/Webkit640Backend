var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();

app.set('port', 3000);
app.use(cors());

var cnt = 0;
app.get("/count", function(req, resp) {
    cnt++;
    var date = new Date();
    var responseData = {
        "dateStr":date.getFullYear()+"-"+
            (date.getMonth()+1)+"-"+
            (date.getDate())+" "+
            (date.getHours())+":"+
            (date.getMinutes()),
        "count":cnt
    }
    resp.end(JSON.stringify(responseData ) );
});

http.createServer(app).listen(app.get('port'), function() {
    console.log(`running on server with http://localhost:${app.get('port')}`);
});
