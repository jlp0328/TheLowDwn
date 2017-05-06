var express = require("express");
var router = express.Router();

var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");

var User = require("../models/User")


//Register
router.get("/register", function(req, res){
  res.render("register");

});

//Login
router.get("/login", function(req, res){
  res.render("login");

});

//Register
router.post("/register", function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.confirm;

    //validation

    req.checkBody("name", "Name is required.").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid.").isEmail();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("confirm", "Passwords do not match.").equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
      res.render("/register", {
        errors: errors
      });

    } else{
        var newUser = new User({
          name: name,
          email: email,
          username: username,
          password: password
        });

        User.createUser(newUser, function (err, user){
            if(err) throw err;
            console.log(user);

        });

        req.flash("success_msg", "You are registered and can now log-in!");
        res.redirect("/");
    }

});

// app.post("/login",
//   passport.authenticate('local',
//     {
//       successRedirect: "/",
//       failureRedirect: "/users/login",
//       function(req, res) {
//         res.redirect("/");
//       }

//     });

module.exports = router;
