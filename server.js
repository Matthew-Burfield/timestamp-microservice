var express = require('express'),
    path    = require('path');
    // sass    = require('node-sass');

var app = express();

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // use either jade or ejs       // instruct express to server up static assets
app.use(express.static('public'));
    

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

app.get('/:timestamp', function(req, res) {
   var date = new Date(Number(req.params.timestamp) * 1000),
       json = {
           "unix": null,
           "natural": null
       },
       months = {
       "1": "January",
       "2": "February",
       "3": "March",
       "4": "April",
       "5": "May",
       "6": "June",
       "7": "July",
       "8": "August",
       "9": "September",
       "10": "October",
       "11": "November",
       "12": "Decmeber"
   };
   if (isNaN(date.getTime())) {
       date = new Date(req.params.timestamp);
   }
   if (isNaN(date.getTime())) {
       date = null;
   }
   if (date !== null) {
       json.unix = date.getTime() / 1000;
       json.natural = months[date.getMonth() + 1] + " " + date.getDate() + ", " + date.getFullYear();
   }
   res.send(json);
});