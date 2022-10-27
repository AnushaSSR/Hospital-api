const passport = require("passport"); //require passport
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/doctors"); //User model
require("dotenv").config(); //to manage .env file

//set the opts of jwttoken,secret key
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // secret fetched from env variable
};

//use the strategy to authenticate the user
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        //if error in finding the user
        console.log("Error in finding user from JWT");
        return;
      }
      if (user) {
        //if user/doctor found
        return done(null, user);
      } else {
        //if user/doctor not found
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
