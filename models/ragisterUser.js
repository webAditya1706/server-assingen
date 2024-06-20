const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ragisterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'superAdmin'],
		default:"user"
	  },
	logo:{
		type:String,
		// required:true
	}
})
ragisterSchema.set("timestamps", true);

const ragisterUser = mongoose.model("RagisterUser", ragisterSchema)

module.exports = ragisterUser;
