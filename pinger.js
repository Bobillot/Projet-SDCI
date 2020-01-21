var ping = require('ping');


var lat = 0;

var host = '10.0.0.201';

var express = require('express')
var app = express()
var LOCAL_ENDPOINT = {IP : 'localhost', PORT : 8989, NAME : 'VnfMonitor'};

app.get('/latency', function(req, res) 
{
    var d = new Date();
    var start = d.getTime();
    for (i = 0; i < 100; i++) 
    {
        ping.sys.probe(host, function(isAlive)
        {
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        });
    }
    var d = new Date();
    var end = d.getTime();
    lat=(end-start)/100;
    resObj = [lat];
    res.send(resObj);
});
console.log("Start VNF Monitoring");
app.listen(LOCAL_ENDPOINT.PORT , function () {
    console.log(LOCAL_ENDPOINT.NAME + ' listening on : ' + LOCAL_ENDPOINT.PORT );
});
