Project is live at: https://unix-nat.herokuapp.com/

An Express API that converts a Unix timestamp into a natural-language formatted date (e.g. March 3, 2016), or vice versa.

The application consists of a single GET route which handles conversion between the two accepted time formats. Times are passed to the application as a route parameter, and their format will be programmatically detected. API responses are in JSON format, and the application will only accept validly-formatted dates.

Note: The live application (linked above) is hosted on Heroku. Please allow a few seconds for the hosting server to wake up when attempting to view it.
