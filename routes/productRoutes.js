const express = require("express");
const route = express.Router();
const productController = require("../controllers/productControllers");
const uploadLogo = require("../middleware/uploadLogo");
const userAuthentication = require("../middleware/authToken")

// Routes
route.get("/getAllProducts", productController.getAllProduct);
route.post("/createProduct",userAuthentication, uploadLogo.single("image"), productController.createProduct);
route.delete("/deleteProduct/:id",userAuthentication, productController.productDelete);
route.patch(
  "/updateProduct/:id",
  userAuthentication,
  uploadLogo.single("image"),
  productController.productUpdate
);
module.exports = route;
