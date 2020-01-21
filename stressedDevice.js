/**
 *  Author: Samir MEDJIAH medjiah@laas.fr
 *  File : device.js
 *  Version : 0.1.0
 */

var express = require('express')
var app = express()
var request = require('request');


var LOCAL_ENDPOINT = {IP : "10.0.0.212", PORT : 9012, NAME : "dev12(stressed)"};
var REMOTE_ENDPOINT = {IP : "10.0.0.202", PORT : 8282, NAME : "gf1"};

var DATA_PERIOD = 300; //10 times faster than a normal device

function doPOST(uri, body, onResponse) {
    request({method: 'POST', uri: uri, json : body}, onResponse); 
}

function register() {
    doPOST(
        'http://' + REMOTE_ENDPOINT.IP + ':' + REMOTE_ENDPOINT.PORT + '/devices/register', 
        {
            Name : LOCAL_ENDPOINT.NAME, 
            PoC : 'http://' + LOCAL_ENDPOINT.IP + ':' + LOCAL_ENDPOINT.PORT, 
        },
        function(error, response, respBody) {
            console.log(respBody);
        }
    );
}

var dataItem = 0;
function sendData() {
    doPOST(
        'http://' + REMOTE_ENDPOINT.IP + ':' + REMOTE_ENDPOINT.PORT + '/device/'+ LOCAL_ENDPOINT.NAME + '/data', 
        {
            Name : LOCAL_ENDPOINT.NAME, 
            Data : dataItem++,
            Time : Date.now(),
        },
        function(error, response, respBody) {
            console.log(respBody);
        }
    );
}

register();

setInterval(sendData, DATA_PERIOD);
