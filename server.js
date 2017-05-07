var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var exphbs = require("express-handlebars");
var request = require("request");

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

var routes = require("./routes/index");
var local = require("./routes/local");

//Express
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(process.cwd() + "/public"));

//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/search", function(req, res){
  res.render("searchUsername");

});

//Express-Session
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true

  }));

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
  next();

});

app.use("/", routes);
app.use("/local", local);

require("./routes/html-routes.js")(app);



//Passport Initialization
app.use(passport.initialize());

app.use(passport.session());





mongoose.connect("mongodb://localhost/thelowdwn");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.listen(port, function() {
  console.log("App running on port " + port);
});



//Route to root and connect index.html
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



//Scraping OkCupid based on daters username
app.post("/dateScrape", function(req, res) {

  var result = {};
  var daterName = req.body.username;

  result.username = daterName;
  console.log("scrape: " + daterName);

  request("https://www.okcupid.com/profile/" + daterName + "?cf=profile_quickview", function(error, response, html) {

    var $ = cheerio.load(html);

    $("div.userinfo2015").each(function (i, element) {
      //may need to add class of active somehow
      result.image= $(this).find("div.userinfo2015-thumb").find("img.active").attr("src");
      result.age= $(this).find(".userinfo2015-basics-asl-age").text();
      result.location= $(this).find(".userinfo2015-basics-asl-location").text();
      console.log("result after scrape: " + result);
      // result.username= $(element).find(".userinfo2015-basics-username").text();
    })
    daterBase();
  });//end of scrape request

  //dater going into the database.
  function daterBase() {

      if (result.image === null) {
        console.log("test");
        //have page tell user no dater exists
        // res.render("<h3>User Not Found</h3>");
      }

      else {
        // console.log("full result" + result);
        var entry = new Dater(result);

        entry.save(function(err, doc) {

          if (err) {
            console.log(err);
          }
          else {
            res.send(doc);
                    }
        });
        // res.redirect("/review");
      }//end of else
    };
});


//post to make review, will need some tweaking
// app.post("/review", function(req, res) {
//   var newReview = new Review(req.body);
//   newReview.save(function(error, doc) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       Dater.findOneAndUpdate({ "_id": req.params.username }, { "review": doc.username }).exec(function(error, doc) {
//           if (error) {
//             console.log(error); 
//           }
//           else {
//             res.send(doc);
//           }
//         });
//     }
//   });
// });

