const ragisterUser = require("../models/ragisterUser");
const cloudnary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

const userControllers = {
  loginUser: async (req, res) => {
	const {body} = req
    try {
		// Check if the email exists in the database
		const loginUserData = await ragisterUser.findOne({ email: body.email });
		
		if (!loginUserData) {
		  res.status(404).json({
			success: false,
			message: "User not registered",
		  });
		  return;
		}
	
		// Compare the provided password with the stored password hash
		const comparePassword = await bcrypt.compare(body.password, loginUserData.password);
		console.log(comparePassword, "====comparePassword");
	
		if (!comparePassword) {
		  res.status(401).json({
			success: false,
			message: "Email or password is incorrect",
		  });
		  return;
		}
	
		// If email and password are correct, send a success response
		res.status(200).json({
		  success: true,
		  message: "Login successful",
		  data: loginUserData,
		});
	
	  } catch (error) {
		// Handle any errors that occurred during the process
		res.status(500).json({
		  success: false,
		  message: "An error occurred",
		  data: error.message,
		});
	  }
  },
  ragisterUser: async (req, res) => {
    const saltround = 5;
    const newUser = new ragisterUser(req.body);
    newUser.password = await bcrypt.hash(newUser.password, saltround);
    try {
      if (req.file) {
        const result = await cloudnary.uploader.upload(req.file.path, {
          folder: "crud-with-men_2",
        });
        newUser.logo = result.url;
        newUser.save();
        res.status(200).json({
          sucess: true,
          message: "User Ragistered",
          data: newUser,
        });
      } else {
        newUser.save();
        res.status(200).json({
          sucess: true,
          message: "User Ragistered",
          data: newUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "User not Ragistered",
        data: error,
      });
    }
  },
  getAllRagisterUser: async (req, res) => {
    try {
      const allData = await ragisterUser.find();
      if (allData) {
        res.status(200).json({
          sucess: true,
          message: "All ragistered users",
          data: allData,
        });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Something went wrong",
        data: error,
      });
    }
  },
  ragisterUserDelete: async (req, res) => {
    const { id } = req.params;
    const userData = ragisterUser.findById(id);
    try {
      if (userData) {
        if (userData.logo) {
          cloudnary.uploader.destroy(userData.logo, (error, result) => {
            if (error) {
              console.error("Error deleting image from Cloudinary:", error);
              return res.status(500).send("Error deleting image");
            }
            console.log(result, "======result");
          });
        }

        const deleteData = await ragisterUser.findByIdAndDelete(id);
        if (deleteData)
          res.status(200).json({
            sucess: true,
            message: "Ragistered user deleted",
            data: deleteData,
          });
        if (!deleteData)
          res.status(500).json({
            sucess: false,
            message: "Something went wrong 22",
            data: error,
          });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Id not found",
        data: error,
      });
    }
  },
  ragisterUpdateUser: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const salt = 5;

    body.password = await bcrypt.hash(body.password, salt);
    console.log(id, "========id");
    let updatedData;
    try {
      if (req?.file) {
        const imagePath = await cloudnary.uploader.upload(req?.file?.path, {
          folder: "crud-with-men_2",
        });
        body.logo = imagePath.url;
        updatedData = await ragisterUser.findByIdAndUpdate(id, body);
        console.log(updatedData, "========updatedData path");

        return res.status(200).json({
          sucess: true,
          message: "User updated",
          data: body,
        });
      } else {
        updatedData = await ragisterUser.findByIdAndUpdate(id, body);
        console.log(updatedData, "========updatedData");

        return res.status(200).json({
          sucess: true,
          message: "User updated",
          data: body,
        });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Id not found",
        data: error,
      });
    }
  },
};

module.exports = userControllers;
