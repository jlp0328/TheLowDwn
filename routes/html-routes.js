var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/about.html"));
    });

    // app.get("/myAccount", function(req, res) {
    //   res.sendFile(path.join(__dirname, "../public/user_home.html"));
    // });

}
