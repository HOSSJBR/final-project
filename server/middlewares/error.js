module.exports = async (err, req, res, next) => {
	return res.status(err.status).json({ status: 500, message: err.message });
};
