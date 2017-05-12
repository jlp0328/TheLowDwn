var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
	datername: {
		type: String,
		required: true
	},
	q1: {
		type: String,
		required: false
	},
	q2: {
		type: String,
		required: false
	},
	q3: {
		type: String,
		required: false
	},
	q4: {
		type: String,
		required: false
	},
	q4a: {
		type: String,
		required: false,
		default: null
	},
	q4b: {
		type: String,
		required: false,
		default: null
	},
	q4b1: {
		type: String,
		required: false,
		default: null
	},
	q4c: {
		type: String,
		required: false,
		default: null
	},
	q5: {
		type: String,
		required: false,
		default: null
	},
	q6: {
		type: String,
		required: false
	},
	q7: {
		type: String,
		required: false
	},
	q8: {
		type: String,
		required: false
	},
	q8a: {
		type: String,
		required: false,
		default: null
	},
	q9: {
		type: String,
		required: false
	},
	q10: {
		type: String,
		required: false
	},
	q11: {
		type: String,
		required: false
	},
	nicety: {
		type: String,
		require: false,
		default: null
	},
	score: {
		type: String,
		require: false
		// will be calculated so may be required
	},
	image: {
		type: String,
		require: false
	}
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;