const { ObjectId } = require("mongodb");
const followActions = require("../actions/followActions");
const userActions = require("../actions/userActions");

const followHandlers = {
	async followUser(req, res, next) {
		const { userId, followerId } = req.query;

		if (!ObjectId.isValid(userId) || !ObjectId.isValid(followerId)) {
			return res.status(402).json({
				status: 402,
				message: `Invalid Object id`,
			});
		}

		const user = await userActions.findById({ id: userId });
		const follower = await userActions.findById({ id: followerId });

		if (!user || !follower) {
			return res.status(500).json({
				status: 500,
				message: `User or Follower are null`,
			});
		}

		const isNotFollowing = await followActions.follow({
			userId,
			followerId,
		});

		if (!isNotFollowing) {
			return res.status(400).json({
				status: 400,
				message: `Already following`,
			});
		}
		return res.status(200).json({
			status: 200,
			message: `Following successfully`,
		});
	},

	async unfollowUser(req, res, next) {
		const { userId, followerId } = req.query;

		return res.status(200).json({
			status: 200,
			message: `Unfollowing`,
		});
	},
};

module.exports = followHandlers;
