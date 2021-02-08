var express = require('express');
var app = express();
var port = 3000;

var cors = require('cors')

const router = express.Router();

var mongoose = require('mongoose');

app.use(cors())

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next()
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/api/', router);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});