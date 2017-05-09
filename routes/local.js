var express = require("express");
var router = express.Router();
var path = require("path");

var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");

var User = require("../models/User");


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

    console.log(name);
    console.log(password);

    //validation

    req.checkBody("name", "Name is required.").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid.").isEmail();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("confirm", "Passwords do not match.").equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
      res.render("register", {
        errors: errors
      });

    } else{
        var newUser = new User({
          name: name,
          email: email,
          username: username,
          password: password
        });

        console.log(newUser);

        User.createUser(newUser, function (err, user){
            if(err) throw err;
            console.log(user);

        });

        req.flash("success_msg", "You are registered and can now log-in!");
        res.redirect("/local/login");
    }

});

passport.use(new LocalStrategy(

  function(username, password, done) {

    User.getUserByUsername(username, function(err, user){

      if (err) throw error;
      if(!user){
        return done(null, false, {message: "Unknown user"});
      }

      User.comparePassword(password, user.password, function(err, isMatch){

      if (err) throw error;
      if(isMatch){

          return done(null, user);

      } else {

        return done(null, false, {message: "Invalid password."} )
      }

      });

    });

  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



router.post("/login", passport.authenticate ("local",
    {

      failureRedirect: "/local/login",
      failureFlash: true}),

      function(req, res) {

        // var username = req.params.username;

        res.redirect("/" + req.user.username);
      }


    );

router.get("/logout", function(req, res){
    req.logout();

    req.flash("success_msg", "You are logged out!");

    res.redirect("/local/login");

});

module.exports = router;
