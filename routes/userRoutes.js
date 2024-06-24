const express = require("express");
const userController = require("../controllers/userControllers");
const route = express.Router();
const uploadLogo = require("../middleware/uploadLogo");
const ragisterUserValidation = require("../validation/ragisterUserValidation");
const userAuthentication = require("../middleware/authToken")

// Routes
route.post(
  "/ragister",
  uploadLogo.single("logo"),
  ragisterUserValidation,
  userController.ragisterUser
);
route.post("/login", userController.loginUser);
route.get("/getAllUser", userAuthentication, userController.getAllRagisterUser);
route.get("/getUserById", userAuthentication, userController.getUserById);
route.delete("/deleteUser/:id", userAuthentication, userController.ragisterUserDelete);
route.patch("/updateUser", userAuthentication, uploadLogo.single("logo"), userController.ragisterUpdateUser);

module.exports = route;
