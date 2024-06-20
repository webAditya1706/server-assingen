const express = require("express");
const userController = require("../controllers/userControllers");
const route = express.Router();
const uploadLogo = require("../middleware/uploadLogo");
const ragisterUserValidation = require("../validation/ragisterUserValidation");

route.post(
  "/ragister",
  uploadLogo.single("logo"),
  ragisterUserValidation,
  userController.ragisterUser
);
route.post("/login", userController.loginUser);
route.get("/getAllData", userController.getAllRagisterUser);
route.delete("/deleteUser/:id", userController.ragisterUserDelete);
route.patch(
  "/updateUser/:id",
  uploadLogo.single("logo"),
  ragisterUserValidation,
  userController.ragisterUpdateUser
);

module.exports = route;
