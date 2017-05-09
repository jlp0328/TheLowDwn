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
	},
	questionFour: {
		type: String,
		required: false
	},
	questionFive: {
		type: String,
		required: false
	},
	questionSix: {
		type: String,
		required: false
	},
	questionSeven: {
		type: String,
		required: false
	},
	questionEight: {
		type: String,
		required: false
	},
	questionNine: {
		type: String,
		required: false
	},
	questionTen: {
		type: String,
		required: false
	},
	score: {
		type: String,
		require: false
		// will be calculated so may be required
	}
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;