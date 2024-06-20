const jwt = require("jsonwebtoken");


const userAuthentication = (req, res, next) => {
	const authorization = req.headers.authorization || req.headers.Authorization
	const SECRET_KEY = process.env.JWT_SECREATE_KEY;
	if (!authorization) {
		return res.status(500).json({
			success: false,
			message: "Token not provided",
		})
	}
	let token = authorization.split(" ")[1];
	jwt.verify(token, SECRET_KEY, (err, decoded) => {
		if (err) {
			res.status(401).json({
				success: false,
				message: "User is not authorized"
			})
		} else {
			req.user = decoded
			next()
		}
	})
}

module.exports = userAuthentication