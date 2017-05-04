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
		type: Integer,
		required: false
	},
	questionThree: {
		type: String,
		required: true
	}
	//not sure would reference any other table...
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;