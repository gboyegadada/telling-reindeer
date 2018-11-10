// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Date API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  var date_string = req.param('date_string');
  
  if (/^[0-9]+$/.test(date_string)) {
    date_string = parseInt(date_string) * 1000;
  }
  
  var d = new Date(date_string); 
  
  if (null === d) {
    res.json({"unix": null, "utc" : "Invalid Date" });
    return;
  }
  
  res.json({"unix": d.getTime(), "utc" : d.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});