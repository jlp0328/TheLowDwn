var express = require("express");
var router = express.Router();

//Get homepage

router.get("/", function(req, res){
  res.render("index");

});

router.get("/myAccount/search", function(req, res){
  res.render("searchUsername");

});

router.get("/myAccount/read", function(req, res){
  res.render("searchExistingReviews");

});

module.exports = router;
