const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const fx          = require("./fx");
const app         = express();

const PORT        = process.env.PORT || 3000;
const IP          = process.env.IP   || "0.0.0.0";

// serve static files.
app.use(express.static('./public', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// API route to get all rates.
app.get('/api/v1/rates', function (req, res) {
  fx(process.env.OER_KEY, function (err, rates) {
    if (err) {
      res.json({ error : err });
    } else {
      res.json(rates);
    }
  });
});

// Set root to the main angular js app.
app.get('/',function (req, res) {
  filepath = path.join(path.dirname(__filename), 'public/index.html');
  res.sendFile(filepath);
});

app.listen(IP, PORT);
console.log('Listening on port ' + PORT + "!");
