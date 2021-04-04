var express = require("express");
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

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next()
});

router.post('/login', (req, res, next) => {
  const user = req.body;

  console.log(user.email);
  if (!user.email) {
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
      return res.status(200).json({ success: true, token: "Bearer " + user.token, email: user.email, category: user.category });
    }
    return status(400).info;
  })(req, res, next);
});

//add a new user to the system and give them an authentication key
router.post('/register', (req, res, next) => {
  // console.log(req.body)
  const user = req.body;

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
      "category": user.category
    });
    finalUser.save();
    res.status(200).send(finalUser);
  })

});

// save instructor applicants from ranked excel sheet
router.post('/save', (req, res, next) => {
  const app = req.body;
  Course.findOne(({ "code": app.code.toLowerCase() }), function (err, course) {
    if (course) {
      course.instructors.forEach(prof => {
        Instructor.updateOne({ email: prof }, { $push: { preference: app } }, function (err, result) {
          if (err) {
            console.log(err)
            res.status(400).send("ERROR: Could not update instructor preference.")
          } else {
            console.log("SUCCESS: Updated instructor preferences.");
          }
        })
      })
    } else {
      res.status(400).send("Cannot find course.");
    };
  });
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

// get instructor
router.get('/:instructor', (req, res, next) => {
  console.log(req.params.instructor);
  const email = req.params.instructor;
  Instructor.find({ email: email }, function (err, data) {
    if (data) {
      console.log(data);
      res.send(data);
    } else {
      res.status(404).send("Instructor not found.");
    }
  })
});

router.put('/match', (req, res, next) => {
  //make course array
  isInstructor = req.body.instructor;

  Course.find({}, function (err, all_courses) {
    //for loop iterating through course array
    //course = i of for loop
    testAwait(all_courses, isInstructor);
    setTimeout(() => sendMatchResults(), 5000)

  });

  async function testAwait(courses, isIns) {
    const start = async () => {
      await asyncForEach(courses, async (data) => {
        await waitFor(500)
        actualMatch(data, isIns);
      })
      console.log('Done')
      return 0;
    }
    start();
  }

  const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async function actualMatch(data, ins) {
    TA.find({ "preference.code": data.code, "hours": 0 })
      .then(tas => {
        hiring_array = hiring(data, tas);
        let final_array = []
        if (!ins) {
          final_array = applicantPreferences(data, hiring_array);
        } else {
          final_array = instructorPreferences(data, hiring_array);
        }
        assignTAs(data, final_array).then(
          function (value) { console.log(value) }
        );

      })
      .catch(err => {
        console.log(err)
      });
  }
  function sendMatchResults() {
    Course.find({}, function (err, courses) {
      res.send(courses)
    })
  }

})

//hiring prioritization
function hiring(course, applicants) {
  //sort course by priority (1 is high, 3 is low)
  for (let i = 0; i < applicants.length; i++) {
    applicants.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }

  for (let i = 0; i < applicants.length; i++) {
    applicants[i].weight = 1;
    applicants[i].weight = applicants[i].weight * i;
  }

  return applicants;

}

//applicant preferences
function applicantPreferences(course, applicants) {
  var new_applicants = Array.from(applicants);
  //sort by ranking (1 is high)
  // for (let i = 0; i < applicants.length; i++) {
  new_applicants.sort(function (a, b) {
    return a.preference.rank - b.preference.rank
  });
  //}

  for (let i = 0; i < new_applicants.length; i++) {
    new_applicants[i].weight = new_applicants[i].weight * i;
  }

  return new_applicants;
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

  for (let i = 0; i < new_instructors.length; i++) {
    new_instructors[i].weight = new_instructors[i].weight * i;
  }

  new_instructors.sort(function (a, b) {
    return a.weight - b.weight;
  });

  return new_instructors;
}

//matching
async function assignTAs(course, applicants) {
  let hours = course.ta_hours_new;
  let i = 0;
  // console.log(applicants);
  while (hours > 0) {
    data = applicants[i];
    console.log(data.name, data.hours)
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

    test = await updateHours(data, course, new_data, update).then(
      function (value) { return 'success' },
      function (error) { return 'failed' }
    );

    console.log(test);
    i++;
  }
}

async function updateHours(data, course, new_data, update) {
  TA.updateOne({ email: data.email }, { hours: update })
    .then(data => {
      Course.updateOne({ code: course.code }, { $push: { assigned: new_data } })
        .then(stuff => {
          console.log(course.code);
          return 0;
        })
        .catch(e => {
          console.log("something happened");
          return 1;
        });
    });
}

//accept ta matches
router.post('/accept', (req, res, next) => {
  let ta = req.body.ta;
  let course = req.body.course;
  let isAccepted = req.body.accept;

  if (isAccepted) {
    Course.updateOne({ code: course, "assigned.name": ta}, { '$set': {"assigned.$.accepted": true }})
      .then(data => { console.log(data) })
      .catch(err => {
        res.status(404).send("something went wrong")
      })
  } else if (!isAccepted) {
    TA.updateOne({ email: ta }, { hours: 0 })
      .catch(err => {
        res.status(404).send("something went wrong")
      })
    Course.updateOne({ code: course }, { $pull: { assigned: { name: ta } } })
      .catch(err => {
        res.status(404).send("something went wrong")
      })
  }

  res.status(200).send("success")

});

//manually remove a TA
router.post('/remove_ta', (req, res, next) => {
  ta = req.body.ta;
  course = req.body.course;

  TA.updateOne({ email: ta }, { hours: 0 })
    .catch(err => {
      res.status(404).send("something went wrong")
    })
  Course.updateOne({ code: course }, { $pull: { assigned: { name: ta } } })
    .catch(err => {
      res.status(404).send("something went wrong")
    })

  res.status(200).send("success")
});

//manually add a TA
router.post('/add_ta', (req, res, next) => {
  ta = req.body.ta;
  course = req.body.course;
  hours = req.body.hours;

  new_data = {
    name: ta,
    hours: hours
  }

  TA.findOne({ email: ta })
    .then(data => {
      if (!data) {
        entry = new TA({ email: ta, hours: hours, accepted: true })
        entry.save(function (err) {
          if (err) {
            console.log(err)
            res.status(400).send("Something went wrong")
          }
        });
      } else {
        TA.updateOne({ email: ta }, { hours: hours })
          .catch(err => {
            res.status(404).send("something went wrong")
          })
      }

      Course.findOne({ code: course, "assigned.name": ta })
        .then(info => {
          if (!info) {
            Course.updateOne({ code: course }, { $push: { assigned: new_data } })
              .then(stuff => {
                res.status(200).send("successfully updated hours")
              })
              .catch(err => {
                res.status(404).send("something went wrong")
              })
          } else {
            Course.updateOne({ code: course }, { $pull: { assigned: { name: ta } } })
              .then(data => {
                Course.updateOne({ code: course }, { $push: { assigned: new_data } })
                  .then(stuff => {
                    res.status(200).send("successfully updated hours")
                  })
                  .catch(err => {
                    res.status(404).send("something went wrong")
                  })
              })
              .catch(err => {
                res.status(404).send("something went wrong")
              })
          }

        })
    })
});

//save new courses to database
router.post('/savecourse', (req, res, next) => {
  let course = req.body.course;

  Course.findOne({ code: course })
    .then(data => {
      if (!data) {
        entry = new Course({ code: course });
        entry.save(function (err) {
          if (err) {
            res.status(400).send("Something went wrong");
          } else {
            res.status(200).send("successfully added course");
          }
        })
      } else {
        res.status(404).send("This course already exists");
      }
    })
    .catch(err => {
      res.status(500).send("Something went wrong");
    })
});

//save course info and questions
router.post('/courseinfo', (req, res, next) => {
  let course = req.body.course;
  let ques = req.body.questions;
  let qual = req.body.qualifications;

  Course.findOne({ code: course })
    .then(data => {
      if (data) {
        Course.updateOne({ code: course }, { qualifications: qual, questions: ques })
          .then(data => {
            res.status(200).send('Successfully updated course');
          })
          .catch(data => {
            res.status(400).send('Something went wrong');
          })
      } else {
        res.status(404).send("Course not found");
      }
    })
    .catch(err => {
      res.status(500).send("Something went wrong");
    })
});

//get course information
router.put('/getcourses', (req, res, next) => {
  Course.find({}, function (err, courses) {
    res.status(200).send(courses);
  });
})

//save TA applicant information
router.post('/saveTAs', (req, res, next) => {
  ta_array = req.body.tas;

  ta_array.forEach(data => {
    entry = new TA({ experience: data.experience, priority: data.priority, email: data.email, name: data.name, preference: data.preference })
    entry.save(function (err) {
      if (err) {
        res.status(400).send("Something went wrong");
      }
    })
  })

  res.status(200).send("Added successfully")
});

//get tas
router.put('/gettas', (req, res, next) => {
  TA.find({}, function (err, tas) {
    res.status(200).send(tas);
  });
});

router.post('/saveinstructor', (req, res, next) => {
  const instructor = req.body.instructor;

  Instructor.updateOne({ email: instructor.email }, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).send("Something went wrong")
    } else {
      output = {
        text: "Successfully updated instructor preferences"
      }
    }
  })
});

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



//clear matching
router.post('/clearmatching', (req, res, next) => {

  //assigned array in courses schema
  Course.updateMany({}, { assigned: [] }, function (err, crs) {
    if (err) {
      console.log('error')
    }
  });
  //set hours to 0 in ta_applicants schema
  TA.updateMany({}, { hours: 0 }, function (err, ta) {
    if (err) {
      console.log('error')
    }
  });

  output3 = {
    text: "Assigned database entries cleared"
  }

  res.status(200).send(output3);

});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

app.use("/api", router);
