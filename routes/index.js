var express = require("express");
var router = express.Router();
var path = require("path");

var User = require("../models/User");
var Dater = require("../models/Dater");
var Review = require("../models/Review");

//Get homepage
router.get("/", function(req, res){
  res.render("index");
});

//Search users to write dater reviews
router.get("/:username/search", function(req, res){

   var login = req.params.username;

  res.render("searchUsername", {username: login});

});

//Answer questions about dater
router.get("/:username/review", function(req, res){
   var login = req.params.username;

  res.render("writeReview", {username: login});
});

//Search for a user in the db to read their reviews
router.get("/:username/read", function(req, res){
   var login = req.params.username;

  res.render("searchExistingReviews", {username: login});
});

//Read and write blog posts about dating experiences
router.get("/:username/blog", function(req, res){
   var login = req.params.username;

  res.render("blog", {username: login});
});

//Read your saved dater reviews
router.get("/:username", ensureAuthentication, function(req, res){

  var login = req.params.username;

     res.render("homepageAndReviews", {username: login});

  });

function ensureAuthentication(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {

        req.flash("error_msg", "You are not logged in.");
        res.redirect("/local/login");
    }

}


module.exports = router;
