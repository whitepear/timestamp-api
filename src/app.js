'use strict';

var express = require('express');
var app = express();

app.get('/:time?', function (req, res) {
    var time = req.params.time;
    if (time === undefined) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.send("WEW");
    }
});

app.listen('8080', function() {
    console.log('Server is running...');
});