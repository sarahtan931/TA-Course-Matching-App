var express = require('express');
var app = express();
var port = 3000;

var cors = require('cors')

const router = express.Router();

var mongoose = require('mongoose');
const uri = 'mongodb+srv://asamara5:3350_app@cluster1.1hkzl.mongodb.net/TA_Application?retryWrites=true&w=majority';

const Course = require("./models/ece_courses.js");
const Instructor = require("./models/instructors.js");
const User = require("./models/user.js");
const TAs = require("./models/ta_applicants.js");
const Application = require("./models/apps.js");

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected")
});

app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function (req, res) {
    
    res.send('Hello World!');
});

app.use('/api/', router);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});