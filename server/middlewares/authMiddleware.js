const jwt = require("jsonwebtoken");
const userActions = require("../actions/userActions");

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith("Bearer ")) {
		return next(new Error("Invalid token"));
	}
	const token = authorization.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_CODE);

		const { userId } = decoded;

		const user = await userActions.findById({ id: userId });
		req.user = user;
		next();
	} catch (error) {
		const err = {
			status: 498,
			message: "Invalid token",
		};
		return next(err);
	}
};
