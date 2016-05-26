'use strict';

var express = require('express');
var app = express();

app.get('/:time?', function (req, res) {
    var time = req.params.time;
    if (time === undefined) {
        // send instruction html page
    } else {
        // send JSON data
    }
});

app.listen('8080', function() {
    console.log('Server is running...');
});