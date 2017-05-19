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
  console.log("params", req.params);

  //set variable in order to have doc set to a more global variable
  var allStories;
  var userReview;
  var userId;
  // var userId;

//variable for find all stories in story table
  var query = Story.find({});

 ///////////////
// //////testing to get userID from user table to use in the review table?
  User.find({username: login}).exec(function(error, user) {

    if (user.length > 0) {

      console.log("how many times do you loop: ", user[0]._id);
      //userId is from person logged into site
      var userId = user[0]._id;

      console.log("UserIDDDD", userId);
      //trying to find reviews made by user based on userId
      Review.find({"_id": "5912431b0eece0121598fc55"}).populate("review").exec(function(error, review) {
            console.log("review", review);

        if (error) {

          console.log(error);
        }

        else {

          console.log("This is supposed to be the reviews:", review);
          //setting callback of reviews to a variable to access it more globally in this router.
          userReview = review;
          //query to get the stories
          query.exec(function(error, doc) {

            if (error) {
            console.log(error);
            }
            //setting callback to variable of allStories to access it globally for render
            allStories = doc;

            res.render("homepageAndReviews", {username: login, story: allStories, review: userReview});
          });//end of query

        }//end of inside else

      });//end of search by id to get attempted reviews

    }//end of if doc > 0

  // var userId = doc._id;
  // console.log("userID", userId);
  });//end of exec function


});//of get username get


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
