var express = require("express");
var router = express.Router();
var path = require("path");

var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");

var User = require("../models/User");


// fbAuth.get('/auth/facebook',
//   passport.authenticate('facebook'));

// fbAuth.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: "/local/login" }),
//   function(req, res) {
//     res.redirect('/');
//   });




// passport.use(new FacebookStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     callbackURL: configAuth.facebookAuth.callbackURL
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// module.exports = fbAuth;
