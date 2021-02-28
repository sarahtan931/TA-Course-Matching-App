var express = require('express');
var app = express();
var port = 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
var cors = require('cors');

const bodyParser = require('body-parser');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/', express.static('static'))
app.use(cors())

const Course = require("./models/ece_courses.js");
const Instructor = require("./models/instructors.js");
const User = require("./models/user.js");
const TAs = require("./models/ta_applicants.js");
const Application = require("./models/apps.js");
require('./passportconfig');

const router = express.Router();
router.use(bodyParser.json());

const uri = 'mongodb+srv://asamara5:3350_app@cluster1.1hkzl.mongodb.net/TA_Application?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected")
});

//login mechanism
router.post('/auth', (req, res) => {
  console.log("Backend " + JSON.stringify(req.body));
  return res.status(200);
});

router.post('/login', (req, res, next) => {
  const user = req.body;

 /* if (!user.email) {
    return res.status(404).send('No email');
  }
  if (!user.password) {
    return res.status(404).send('no password');
  }
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return res.status('404').send('Error')
    }
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.status(200).json({ success: true, token: "Bearer " + user.token, email: user.email, category: user.cateogory });
    }
    return status(400).info;
  })(req, res, next);
}); */
  console.log(user.email);
   if(!user.email) {
     return res.status(404).send('No email');
   }
   if(!user.password) {
     return res.status(404).send('no password');
   }
 return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
     if(err) {
      return res.status('404').send('Error')
     }

     if(passportUser) {
       const user = passportUser;
       user.token = passportUser.generateJWT();
       return res.status(200).json({ success: true, token: "Bearer " + user.token, email: user.email, category: user.category });
     }
     return status(400).info;
   })(req, res, next);
 });

//add a new user to the system and give them an authentication key
router.post('/register', [
  check("email").isEmail(),
  check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).isLength({ min: 1, max: 20 }).escape()
], (req, res, next) => {
  const user = req.body;
  var err = validationResult(req);
  if (!err.isEmpty()) {
    res.status('404').send('please enter a valid email')
  } else {
    User.findOne(({ "email": user.email }), function (err, exists) {
      if (err || exists) {
        return res.status(404).send(`Already Exists`);
      }
      if (!user.email) {
        return res.status(422).send('Error')
      }
      const finalUser = new User({
        "name": user.name,
        "email": user.email,
        "authenticationkey": user.authenticationkey,
        "password": null
      });
      finalUser.save();
      res.send(finalUser)
    })
  }
});

//with authentication key, new user set password 
router.post('/setpassword', (req, res, next) => {
  email = req.body.email;
  password = req.body.password;
  authkey = req.body.authenticationkey;
  User.findOne(({ "email": email, "authenticationkey": authkey }), function (err, user) {
    if (!password) {
      return res.status(422).send('Error');
    }
    console.log(password)
    user.setPassword(password);
    user.save();
    res.send(user)
  })

})

//add an instructor
router.post('/addinstructor', (req, res, next) => {
  in_email = req.body.email;
  Instructor.findOne(({ "email": in_email }), function (err, user) {
    if (user) {
      res.status(400).send("Instructor already exists")
    }
    else if (err) {
      res.status(400).send(err)
    }
    else {
      entry = new Instructor({ email: in_email })
      entry.save(function (err) {
        if (err) {
          console.log(err)
          res.status(400).send("Something went wrong")
        } else {
          output = {
            text: "Instructor added"
          }
          res.status(200).send(output)
        }
      })
    }
  })
})

//add instructor preferences
router.post('/ins-prefer', (req, res, next) => {
  ins_email = req.body.email;
  pref = req.body.preferences;

   Instructor.find({ email: ins_email})
      .then(items => {
        if (items.length > 0) {
          Instructor.updateOne({ email: ins_email}, {preference: pref}, function (err, result) {
            if (err) {
              console.log(err)
              res.status(400).send("Something went wrong")
            } else {
              output = {
                text: "Successfully updated instructor preferences"
              }
              res.status(200).send(output)
            }
          })
        } else {
          res.status(404).send("Instructor not found")
        }
      })
})

//DATABASE FILLING FUNCTIONS
//instructor
router.post('/fillinstructor', (req, res, next) => {
  in_email = req.body.email;
  in_prefer = req.body.preference;

  Instructor.findOne(({ "email": in_email }), function (err, user) {
    if (user) {
      res.status(400).send("Instructor already exists")
    }
    else if (err) {
      res.status(400).send(err)
    }
    else {
      entry = new Instructor({ email: in_email, preference: in_prefer})
      entry.save(function (err) {
        if (err) {
          console.log(err)
          res.status(400).send("Something went wrong")
        } else {
          output = {
            text: "Instructor added"
          }
          res.status(200).send(output)
        }
      })
    }
  })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

app.use('/api', router);

