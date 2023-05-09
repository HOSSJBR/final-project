const searchActions = require("../actions/searchActions");

const searchHandlers = {
	async getUsersFromSearchTerm(req, res, next) {
		const { term } = req.query;
		if (!term) {
			return res.status(422).json({
				status: 422,
				message: `Invalid search term.`,
			});
		}

		const users = await searchActions.search({ term });

		return res.status(200).json({
			status: 200,
			users,
		});
	},
	async getFollowers(req, res, next) {
		// todo
	},
	async getFollowing(req, res, next) {
		// todo
	},
};

module.exports = searchHandlers;
