var express = require("express");
var router = express.Router();

//Get homepage
router.get("/", function(req, res){
  res.render("index");
});

//Search users to write dater reviews
router.get("/myAccount/search", function(req, res){
  res.render("searchUsername");
});

//Answer questions about dater
router.get("/myAccount/review", function(req, res){
  res.render("writeReview");
});

//Search for a user in the db to read their reviews
router.get("/myAccount/read", function(req, res){
  res.render("searchExistingReviews");
});

//Read and write blog posts about dating experiences
router.get("/myAccount/blog", function(req, res){
  res.render("blog");
});

//Read your saved dater reviews
router.get("/myAccount", function(req, res){
  res.render("homepageAndReviews");
});

module.exports = router;
