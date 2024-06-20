const productSchema = require("../models/productSchema")
const cloudinary = require('cloudinary').v2;


const productController = {
	createProduct: async (req, res) => {
		const { body } = req;
		try {
			const newProduct = new productSchema(body);
			if (req.file) {
				const result = await cloudinary.uploader.upload(req.file.path, {
					folder: "crud-with-men_2",
				});
				newProduct.image = result.url;
				await newProduct.save();
				res.status(200).json({
					success: true,
					message: "Product created successfully",
					data: newProduct,
				});
			}
		} catch (error) {
			console.error("Error creating product:", error);
			res.status(500).json({ error: "Failed to create product" });
		}
	},
	getAllProduct: async (req, res) => {
		const products = await productSchema.find();
		res.status(200).json({
			sucess: true,
			message: "get all products",
			data: products
		})
	},
	productDelete: async (req, res) => {
		const { id } = req.params;
		const productData = productSchema.findById(id);
		try {
			if (productData) {
				if (productData.logo) {
					cloudinary.uploader.destroy(productData.logo, (error, result) => {
						if (error) {
							console.error("Error deleting image from Cloudinary:", error);
							return res.status(500).send("Error deleting image");
						}
						console.log(result, "======result");
					});
				}

				const deleteData = await productSchema.findByIdAndDelete(id);
				if (deleteData)
					res.status(200).json({
						sucess: true,
						message: "Product deleted",
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
	productUpdate: async (req, res) => {
		const { id } = req.params;
		const { body } = req;

		let updatedData;
		try {
			console.log(req?.file,"=====req?.file");
			if (req?.file) {
				const imagePath = await cloudinary.uploader.upload(req?.file?.path, {
					folder: "crud-with-men_2",
				});
				console.log(imagePath.url,"=====imagePath.url");
				body.image = imagePath.url;
				updatedData = await productSchema.findByIdAndUpdate(id, body);
				console.log(updatedData, "========updatedData path");

				return res.status(200).json({
					sucess: true,
					message: "Product updated",
					data: body,
				});
			} else {
				updatedData = await productSchema.findByIdAndUpdate(id, body);
				return res.status(200).json({
					sucess: true,
					message: "Product updated",
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
}

module.exports = productController;