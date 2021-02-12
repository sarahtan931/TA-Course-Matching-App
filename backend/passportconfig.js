const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require("./models/user.js");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, 
function (email, password, cb) {
    return User.findOne({"email": email})
       .then(user => {
           if (!user || !user.validatePassword(password)) {
               return cb(null, false, {message: 'Incorrect email or password.'});
           }
           return cb(null, user, {message: 'Logged In Successfully'});
      })
      .catch(err => cb(err));
}
));