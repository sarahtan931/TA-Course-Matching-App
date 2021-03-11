var express = require("express");
var underscore = require("underscore");
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
app.use("/", express.static("static"));
app.use(cors());

const Course = require("./models/ece_courses.js");
const Instructor = require("./models/instructors.js");
const User = require("./models/user.js");
const TA = require("./models/ta_applicants.js");
const Application = require("./models/apps.js");
require("./passportconfig");

const router = express.Router();
router.use(bodyParser.json());

const uri =
	"mongodb+srv://asamara5:3350_app@cluster1.1hkzl.mongodb.net/TA_Application?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected");
});

//login mechanism
router.post("/auth", (req, res) => {
	console.log("Backend " + JSON.stringify(req.body));
	return res.status(200);
});

router.post('/login', (req, res, next) => {
  const user = req.body;
  
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

router.post('/save', (req, res, next) => {
  data = req.body;
  console.log(data);

  appsByCourse = underscore.sortBy(data, 'Course Code')

  appsByCourse.forEach(apps => {
    Course.findOne(({"code": apps[0]["Course Code"]}), function (err, course) {
      course.instrucors.forEach(prof => {
        Instructor.updateOne({email: prof}, { $set: {preference: apps}}, function(err, result) {
          if (error) {
            console.log(err)
            res.status(400).send("ERROR: Could not update instructor preference.")
          } else {
            console.log("SUCCESS: Updated instructor preferences.");
          }
        })
      });
    });
  });
  // populat instructor preferences with new users
  // pass in the excel object with all users
})

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
});

//with authentication key, new user set password
router.post("/setpassword", (req, res, next) => {
	email = req.body.email;
	password = req.body.password;
	authkey = req.body.authenticationkey;
	User.findOne(
		{ email: email, authenticationkey: authkey },
		function (err, user) {
			if (!password) {
				return res.status(422).send("Error");
			}
			console.log(password);
			user.setPassword(password);
			user.save();
			res.send(user);
		}
	);
});

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

  Instructor.find({ email: ins_email })
    .then(items => {
      if (items.length > 0) {
        Instructor.updateOne({ email: ins_email }, { preference: pref }, function (err, result) {
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

router.get('/match', (req, res, next) => {
  //make course array
  Course.find({}, function (err, all_courses) {
    //for loop iterating through course array
    //course = i of for loop
    let all_tas = [];
    all_courses.forEach(data => {
      //search applications for applicants in preferences for matching course;
      TA.find({ "preference.code": data.code, "hours": 0 })
        .then(tas => {
          console.log(tas);
          hiring_array = hiring(data, tas);
          app_pref = applicantPreferences(data, hiring_array);
          final_array = instructorPreferences(data, app_pref);
          assignTAs(data, final_array);

        })
        .catch(err => {
          console.log(err)
        });

    });

    setTimeout(() => sendMatchResults(), 1500)

  });

  function sendMatchResults() {
    Course.find({}, function (err, courses) {
      res.send(courses)
    })
  }

})

//hiring prioritization
function hiring(course, applicants) {
  //sort course by priority (1 is high, 3 is low)
  //get top 50% and return this array
  for (let i = 0; i < applicants.length; i++) {
    applicants.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }

  let arraycheck = Math.ceil(course.ta_hours_new/5)
  if((applicants.length/2) > arraycheck){
    return applicants.slice(0, Math.floor(applicants.length / 2));
  } else {
    return applicants.slice(0, applicants.length - 1)
  }

}

//applicant preferences
function applicantPreferences(course, applicants) {
  var applicantPref = [];
  var new_applicants = Array.from(applicants);
  //sort by ranking (1 is high)
  // for (let i = 0; i < applicants.length; i++) {
  new_applicants.sort(function (a, b) {
    return a.preference.rank - b.preference.rank
  });
  //}

  //get top 50% and return this array
  let arraysize = new_applicants.length / 2;
  let arraycheck = Math.ceil(course.ta_hours_new/5)
  if (arraysize > arraycheck){
    for (let i = 0; i < arraysize; i++) {
      applicantPref.push(new_applicants[i]);
    }
  } else {
    for (let i = 0; i < arraycheck; i++) {
      applicantPref.push(new_applicants[i]);
    }
  }
  return applicantPref;
}

//instructor preferences
function instructorPreferences(course, instructors) {
  var instructorPref = [];
  let new_instructors = Array.from(instructors);
  //sort by ranking
  //for (let i = 0; i < instructors.length; i++) {
  new_instructors.sort(function (a, b) {
    return a.preference.rank - b.preference.rank
  });
  //}
  //send top x
  let arraysize = Math.ceil(course.ta_hours_new/5)
  for (let i = 0; i < arraysize; i++) {
    instructorPref.push(new_instructors[i]);
  }
  return instructorPref;
}

//matching
function assignTAs(course, applicants) {
  hours = course.ta_hours_new;
 // console.log(applicants);
  try {
    applicants.forEach(data => {
      console.log(data.name, course.code)
      let update = 0;
      if (data.experience == true) {
        if (hours < 10) {
          update = hours;
          hours = 0;
        }
        else if (hours >= 10) {
          update = 10;
          hours = hours - 10;
        }
      }
      else {
        if (hours < 5) {
          update = hours;
          hours = 0;
        }
        else if (hours >= 5) {
          update = 5;
          hours = hours - 5
        }
      }

      new_data = {
        name: data.email,
        hours: update
      };
      console.log(update)
      console.log(hours)
      TA.updateOne({ email: data.email }, { hours: update })
      .then(data => {console.log("hello")})
      Course.updateOne({ code: course.code }, { $push: { assigned: new_data } })
      .then(console.log("hello2"))
      if(hours == 0){
        console.log('What happened')
        throw Error()
      }
    });
  } catch (e) { return 0;}

}

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
      entry = new Instructor({ email: in_email, preference: in_prefer })
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
});

//TA
router.post('/fillta', (req, res, next) => {
  ta_email = req.body.email;
  ta_name = req.body.name;
  ta_exp = req.body.experience;
  ta_priority = req.body.priority;
  ta_prefer = req.body.preference;

  TA.findOne(({ "email": ta_email }), function (err, user) {
    if (user) {
      res.status(400).send("TA already exists")
    }
    else if (err) {
      res.status(400).send(err)
    }
    else {
      entry = new TA({ email: ta_email, name: ta_name, experience: ta_exp, priority: ta_priority, preference: ta_prefer })
      entry.save(function (err) {
        if (err) {
          console.log(err)
          res.status(400).send("Something went wrong")
        } else {
          output = {
            text: "TA added"
          }
          res.status(200).send(output)
        }
      })
    }
  })
});

//courses
router.post('/fillcourse', (req, res, next) => {
  cr_code = req.body.code;
  cr_hours = req.body.hours;
  cr_instructors = req.body.instructors;

  Course.findOne(({ "code": cr_code }), function (err, user) {
    if (user) {
      res.status(400).send("Course already exists")
    }
    else if (err) {
      res.status(400).send(err)
    }
    else {
      entry = new Course({ code: cr_code, instructors: cr_instructors, ta_hours_new: cr_hours })
      entry.save(function (err) {
        if (err) {
          console.log(err)
          res.status(400).send("Something went wrong")
        } else {
          output = {
            text: "Course added"
          }
          res.status(200).send(output)
        }
      })
    }
  })
});

//applications
router.post('/fillapps', (req, res, next) => {
  a_email = req.body.email;
  a_course = req.body.course;
  a_name = req.body.name;

  Application.findOne(({ "course": a_course, "email": a_email }), function (err, user) {
    if (user) {
      res.status(400).send("Course already exists")
    }
    else if (err) {
      res.status(400).send(err)
    }
    else {
      entry = new Application({ course: a_course, email: a_email, name: a_name })
      entry.save(function (err) {
        if (err) {
          console.log(err)
          res.status(400).send("Something went wrong")
        } else {
          output = {
            text: "Application added"
          }
          res.status(200).send(output)
        }
      })
    }
  })
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});

app.use("/api", router);
