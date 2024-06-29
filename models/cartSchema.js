const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newCart = new Schema({
    userId: {
        type: String,
        required: true
    },
    product: {
        _id: {
            type: String,
            required: true
        },
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
            required: true
        },
        createdBy: {
            type: String,
            required: true
        }
    }
})
newCart.set("timestamps", true);

const cartSchema = mongoose.model("Cart", newCart)

module.exports = cartSchema;
