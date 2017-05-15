var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var StorySchema = new Schema ({
	username: {
		type: String,
		required: true
	},

	category: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},
	//look into validators for max length.
	story: {
		type: String,
		required: true
	},

	display: {
		type: Boolean,
		default: false
	}

});

var Story = mongoose.model("Story", StorySchema);

module.exports = Story;
