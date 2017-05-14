var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var exphbs = require("express-handlebars");
var request = require("request");
// var multer  = require('multer')
// var upload = multer({ dest: ".uploads/"}).single("profilePic");

var cheerio = require("cheerio");

var path = require("path");


var mongoose = require("mongoose");


var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook");
var MongoStore = require("connect-mongo")(session);

mongoose.Promise = Promise;

// Require History Schema
var Dater = require("./models/Dater");
var User = require("./models/User");
var Review = require("./models/Review");
var Story = require("./models/Story");

var routes = require("./routes/index");
var local = require("./routes/local");
var fbAuth = require("./routes/passport");

//Express
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(process.cwd() + "/public"));

//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());


//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Express-Session
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true

  }));

//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

//Express-Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
app.use(flash());

app.use(function(req, res, next){

  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();

});

app.use("/", routes);
app.use("/local", local);
// app.use("/passport", fbAuth);

require("./routes/html-routes.js")(app);

var db = process.env.MONGODB_URI || "mongodb://localhost/thelowdwn";

mongoose.connect(db, function(error){
  if (error){
    console.log(error);
  } else {

    console.log("Working!!!!!")
  }

});
// var db = mongoose.connection;

// mongoose.connect("mongodb://heroku_89n03gfl:evsmtsk2gc0eaaml61i16scgr0@ds137261.mlab.com:37261/heroku_89n03gfl");
// var db = mongoose.connection;



// Show any mongoose errors
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });

// Once logged in to the db through mongoose, log a success message
// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });


app.listen(port, function() {
  console.log("App running on port " + port);
});



//Route to root and connect index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});



//Scraping OkCupid based on daters username
app.post("/dateScrape", function(req, res) {
  var result = {};
  var daterName = req.body.username;

  result.username = daterName;
  console.log("scrape: " + daterName);

  request("https://www.okcupid.com/profile/" + daterName + "?cf=profile_quickview", function(error, response, html) {

    var $ = cheerio.load(html);

    var daterInfo = $("div.userinfo2015");
    if(daterInfo.length == 0) {
      console.log("homie don't play dat");

      req.flash("error_msg", "Please provide a valid username from OkCupid");
    }

    else {

    $("div.userinfo2015").each(function (i, element) {
      result.image= $(this).find("div.userinfo2015-thumb").find("img.active").attr("src");
      result.age= $(this).find(".userinfo2015-basics-asl-age").text();
      result.location= $(this).find(".userinfo2015-basics-asl-location").text();
    });
        //dater going into the database.
        var entry = new Dater(result);

        entry.save(function(err, doc) {

          if (err) {
            console.log(err);
          }
          else {
            res.send(doc);
          }

        });
    }//end of else where div exists for scrape
  });//end of scrape request
});

app.post("/:username/review", function(req, res){

    var user = req.params.username;

    var datername = req.body.datername;
    console.log("PLEASE WORK: ", datername);

    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q4a = req.body.q4a;
    var q4b = req.body.q4b;
    var q4b1 = req.body.q4b1;
    var q4c = req.body.q4c;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q8a = req.body.q8a;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    var q11 = req.body.q11;
    var nicety = req.body.nice;
//update variable score once do math
    var score = "75";

    var daterImage = req.body.daterImage;

    console.log("checking looks: ", q8a);

        var entry = new Review({
          datername: datername,
            q1: q1,
            q2: q2,
            q3: q3,
            q4: q4,
            q4a: q4a,
            q4b: q4b,
            q4b1: q4b1,
            q4c: q4c,
            q5: q5,
            q6: q6,
            q7: q7,
            q8: q8,
            q8a: q8a,
            q9: q9,
            q10: q10,
            q11: q11,
            nicety: nicety,
            score: score,
            image: daterImage
        });

        // console.log(newReview);

        entry.save(function (err, review){
            if(err) throw err;
            // console.log(review);

        res.render("reviewSummary", {review: review, username: user});
        req.flash("success_msg", "Your review has been successfully submitted!");
        });

});



//post dating story to story table
app.post("/:username/blog", function(req, res) {
  var username = req.params.username;

    var category = req.body.storyCategory;
    var title = req.body.storyTitle;
    var story = req.body.storyContent;

    var entry = new Story({
      username: username,
      category: category,
      title: title,
      story: story
    });

    entry.save(function (err, doc) {
      if (err) throw err;

    // res.render("readstory", {story: entry, username: username});

    req.flash("success_msg", "Thank you for sharing! Your story has been successfully submitted!");
    res.redirect("/" + username);
    });



});
//end of posting dating story

//using datername to search in daterbase for dater and sending info to app.js fn
app.post("/reviewing", function(req, res) {

  var datername = req.body.datername;

  console.log("reviewDatername: ", datername);

  Review.find({datername:datername}).exec(function(error, doc) {
    if (error) {
    console.log(error);
    }
    // console.log(doc);
    // console.log("doc: ", doc[0].datername);
    res.send(doc);
  });
});
