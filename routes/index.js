var express = require("express");
var router = express.Router();

//Get homepage

router.get("/", function(req, res){
  res.render("index");

});

router.get("/search", function(req, res){
  res.render("searchUsername");

});

module.exports = router;
