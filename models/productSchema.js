const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newProduct = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required:true
	},
	createdBy:{
		type: String,
		required:true
	}
})
newProduct.set("timestamps", true);

const productsSchema = mongoose.model("Products", newProduct)

module.exports = productsSchema;
