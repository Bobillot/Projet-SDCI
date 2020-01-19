var ping = require('ping');

const reducer = (accumulator, currentValue) => accumulator + currentValue;

var latencies = [];
var mean = 0;
//var rank = 0;
var host = '10.0.0.201';

var express = require('express')
var app = express()
var LOCAL_ENDPOINT = {IP : 'localhost', PORT : 8989, NAME : 'VnfMonitor'};

app.get('/latency', function(req, res) 
{
    for (i = 0; i < 100; i++) 
    {
        latencies.push(0);
        var d = new Date();
        var start = d.getTime();
        ping.sys.probe(host, function(isAlive)
        {
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            //console.log(msg);
        });
        var d = new Date();
        var end = d.getTime();

        latency = end-start;
        latencies[i]=latency;
    }
    mean = latencies.reduce(reducer);
    mean = mean/100;
    console.log('sent ' + mean);
    resObj = [mean];
    res.send(resObj);
    latencies = []
});
console.log("Start VNF Monitoring");
app.listen(LOCAL_ENDPOINT.PORT , function () {
    console.log(LOCAL_ENDPOINT.NAME + ' listening on : ' + LOCAL_ENDPOINT.PORT );
});
