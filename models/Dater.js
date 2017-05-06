var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var DaterSchema = new Schema ({
	username: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: false
	},
	age: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	//need to look at which table this refers to
	review: {
		type: Schema.Types.ObjectId,
		ref: "Review"
	}
});

var Dater = mongoose.model("Dater", DaterSchema);

module.exports = Dater;
