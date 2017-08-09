const express     = require('express');
const bodyParser  = require('body-parser');
const wagner      = require('wagner-core');
const app         = express();

require("./dependencies.js")(wagner);

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use('/', require('./angular-routes.js')(wagner));
app.use('/api/v1', require('./api.js')(wagner));
app.use(express.static('./public', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.listen(3000);
console.log('Listening on port 3000!');
