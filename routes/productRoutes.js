const express = require("express");
const route = express.Router();
const productController = require("../controllers/productControllers");
const uploadLogo = require("../middleware/uploadLogo");

// Routes
route.get("/getAllProducts", productController.getAllProduct);
route.post("/createProduct", uploadLogo.single("image"), productController.createProduct);
route.delete("/deleteProduct/:id", productController.productDelete);
route.patch(
  "/updateProduct/:id",
  uploadLogo.single("image"),
  productController.productUpdate
);
module.exports = route;
