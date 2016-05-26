// app does not support leap year detection for any year beyond 2099

'use strict';

var express = require('express');
var app = express();

app.get('/:time?', function (req, res) {
    var time = req.params.time;
    if (time === undefined) {
        res.sendFile(__dirname + '/index.html');
    } else {
        var isValid = true; // variable that tracks validity of the date passed, false is valid, true is invalid
        time = time.split(' ');
        
        // check format of parameter, if not natural or unix, set isValid to false
        if (time.length === 3) {
            // it's natural date format, run some more tests to be sure
            
            // check if year is valid
            if (time[2] < 1970) {
                isValid = false;                
            }
            
            // check if month is valid
            // if so, check if date is valid respective to month
            if (time[0] === 'January' || 'March' || 'May' || 'July' || 'August' || 'October' || 'December') {
                if (time[1] < 1 || time[1] > 31) {
                    isValid = false;
                }
            } else if (time[0] === 'September' || 'April' || 'June' || 'November') {
                if (time[1] < 1 || time[1] > 30) {
                    isValid = false;
                }
            } else if (time[0] === 'February') {
                // check if year can be divided evenly by 4. if so, its a leap year
                if (time[2] % 4 === 0) {
                    if (time[1] < 1 || time[1] > 29) {
                        isValid = false;
                    }
                } else if (time[1] < 1 || time[1] > 28) {
                    isValid = false;
                }
            } else {
                isValid = false;
            }
            
            if (isValid) {
                var naturalTime = time.join(' ');
                var unixTime = Math.floor(Date.parse(time)/1000);
            }
            
        } else if (time.length === 1) {
            if (time[0] < 0) {
                isValid = false;
            }
            // it's a unix timestamp, run some more tests to be sure
            // can't be lower than zero
            // can only be numbers -- no whitespace or letters
            if (isValid) {
                // convert
            }
        } else {
            isValid = false;
        }
        
        if (isValid) {
            res.send('{"unix": ' + unixTime + ', "natural": ' + naturalTime + '}');
        } else {
            res.send('{"unix": null, "natural": null}');
        }
    }
});

app.listen('8080', function() {
    console.log('Server is running...');
});