const cartSchema = require("../models/cartSchema");

const cartController = {
    addToCartController: async (req, res) => {
        let body = {
            userId: "",
            product: {}
        }
        body.userId = req.user.userId;
        body.product = req.body;
        try {
            const newCart = new cartSchema(body);
            const addTocart = await newCart.save();
            if (addTocart) {
                res.status(200).json({
                    success: true,
                    message: "Product added into the cart",
                    data: addTocart,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Product not added to cart",
                data: {},
            });
        }
    },

    getAllCartController: async (req, res) => {
        const {userId} = req.user;
        try {
            const cartData = await cartSchema.find({userId});
            if (cartData) {
                res.status(200).json({
                    success: true,
                    message: "Product added into the cart",
                    data: cartData,
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Product not added to cart",
                data: {},
            });
        }
    },
    // removefromCart
    removeFromCartController: async (req, res) => {
        const {id} = req.params
        try {
            const ramoveCart = await cartSchema.findByIdAndDelete(id)
            if(ramoveCart){
                res.status(200).json({
                    success: true,
                    message: "Product remove from the cart",
                    data: ramoveCart,
                });
            }
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Cart not found",
                data: {},
            });
        }
    },
    productPlaceorder: async (req, res) => {
		user = req.user;
		try {
			if(user){
                await cartSchema.deleteMany({userId:user.userId})                
				res.status(200).json({
					sucess: true,
					message: "Product went to placeorder",
					data: {}
				})
			}			
		} catch (error) {
			res.status(500).json({
				sucess: false,
				message: "User not found",
				data: error,
			});
		}
	},
}

module.exports = cartController