var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var StorySchema = new Schema ({
	username: {
		type: String,
		required: true
	},
	//look into validators for max length.
	story: {
		type: String,
		required: true
	}
	
	//would be linked to User schema
});

var Story = mongoose.model("Story", StorySchema);

module.exports = Story;