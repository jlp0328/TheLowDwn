var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var exphbs = require("express-handlebars");

var mongoose = require("mongoose");


var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook");
var MongoStore = require("connect-mongo")(session);

mongoose.Promise = Promise;

// Require History Schema
var Dater = require("./models/Dater");
var User = require("./models/User");

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
app.use("/users", local);


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
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// app.get("/register", function(req,res){

//    res.render("register");

// });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
