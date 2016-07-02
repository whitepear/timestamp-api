// app does not support leap year detection for any year beyond 2099
'use strict';
var path = require('path');
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:time?', function (req, res) {
    var time = req.params.time;
    if (time === undefined) {
        res.sendFile(__dirname + '/public/index.html');
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
            if (time[0] === 'January' ||
                time[0] === 'March' ||
                time[0] === 'May' ||
                time[0] === 'July' ||
                time[0] === 'August' ||
                time[0] === 'October' ||
                time[0] === 'December') {
                if (time[1] < 1 || time[1] > 31) {
                    isValid = false;
                }
            } else if (time[0] === 'September' ||
                       time[0] === 'April' ||
                       time[0] === 'June' ||
                       time[0] === 'November') {
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
            } // if valid convert to unix format
            
        } else if (time.length === 1) {
            
            // check if number is less than zero
            if (time[0] < 0) {
                isValid = false;
            }
            
            // check if number is NaN (contains whitespace, letters, symbols, etc.)
            if (isNaN(time[0])) {
                isValid = false;
            }
            
            if (isValid) {
                unixTime = time.join('');
                naturalTime = new Date(time * 1000); // * 1000 to convert secs to ms
                
                var naturalMonth = naturalTime.getMonth(); // returns number representing month
                var monthList = ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                naturalMonth = monthList[naturalMonth]; // assign string version of month
                
                var naturalDate = naturalTime.getDate();
                
                var naturalYear = naturalTime.getFullYear();
                
                naturalTime = '"' + naturalMonth + ' ' + naturalDate + ', ' + naturalYear +'"'; // assemble into a string
                
            } // if valid convert to natural language format
            
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

app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running...');
});