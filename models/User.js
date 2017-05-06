var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
  // title is a required string
  username: {
    type: String,
    required: true
  },
  // link is a required string
  password: {
    type: String,
    required: true
  },

    email: {
      type: String,
      required: true
  },

    name: {
      type: String,
      required: true
  },

    image:{
      type: String,
    }

});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
// module.exports = User;

module.exports.createUser = function (newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
        // Store hash in your password DB.
    });
});

}
