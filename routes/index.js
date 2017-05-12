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
// console.log("params: ", req.params.id);
// console.log("body ", req.params.body);

  var login = req.params.username;
  //set variable in order to have doc set to a more global variable
  var allStories;
  var userReview;

//variable for find all stories in story table
  var query = Story.find({});

  var userId = req.body.id;

  Review.find({"_id": userId}).exec(function(error, doc) {
    if (error) {
      console.log(error);
    }
    userReview = doc;
    
  });
//get stories from story table
  query.exec(function(error, doc) {
    if (error) {
      console.log(error);
    }
    // console.log(doc);
     allStories = doc;
      // res.render("readstory", {story: doc});   
     res.render("homepageAndReviews", {username: login, story: allStories, review: userReview});
  });



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
