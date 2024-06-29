const express = require("express");
const userAuthentication = require("../middleware/authToken");
const cartController = require("../controllers/cartController");
const route = express.Router();

route.post("/addToCart",userAuthentication, cartController.addToCartController);
route.get("/getAllCart",userAuthentication, cartController.getAllCartController);
route.delete("/removeFromCart/:id",userAuthentication, cartController.removeFromCartController)


module.exports = route;