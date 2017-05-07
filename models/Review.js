var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
	username: {
		type: String,
		required: true
	},
	questionOne: {
		type: String,
		required: false
	},
	questionTwo: {
		type: String,
		required: false
	},
	questionThree: {
		type: String,
		required: false
	}
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;