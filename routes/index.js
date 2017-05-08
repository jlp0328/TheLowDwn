var express = require("express");
var router = express.Router();
var path = require("path");

var User = require("../models/User");

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
router.get("/:username", function(req, res){

  var login = req.params.username;

     res.render("homepageAndReviews", {username: login});

  });


module.exports = router;
