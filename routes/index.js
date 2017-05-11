var express = require("express");
var router = express.Router();
var path = require("path");

var User = require("../models/User");
var Review = require("../models/Review");
var Dater = require("../models/Dater");
var Story = require("../models/Story");


//Get homepage
router.get("/", function(req, res){
  res.render("index");
});

//User Dashboard that has access to their personal reviews
router.get("/:username", ensureAuthentication, function(req, res){

  var login = req.params.username;

     res.render("homepageAndReviews", {username: login});

  });

//Search users to write dater reviews
router.get("/:username/search", function(req, res){

   var login = req.params.username;

  res.render("searchUsername", {username: login});

});

//Answer questions about dater
router.get("/:username/review", function(req, res){
   var login = req.params.username;

  res.render("reviewSummary", {username: login});
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



function ensureAuthentication(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {

        req.flash("error_msg", "You are not logged in.");
        res.redirect("/local/login");
    }

}


module.exports = router;
