const getDatabaseCon = require("../utils/db");

const followActions = {
	async follow({ userId, followerId }) {
		const { db, client } = await getDatabaseCon();

		const alreadyFollowing = await db.collection("followers").findOne({
			userId: { $eq: userId },
			followerId: { $eq: followerId },
		});

		if (alreadyFollowing) {
			await client.close();
			return false;
		}
		await db.collection("followers").insertOne({
			userId,
			followerId,
			followDate: Date.now(),
		});

		await client.close();
		return true;
	},
	async unfollow({ userId, followerId }) {
		const { db, client } = await getDatabaseCon();

		await db.collection("followers").deleteOne({
			$and: [{ userId: { $eq: userId } }, { followerId: { $eq: followerId } }],
		});
		await client.close();
	},

	async alreadyFollowing() {},
};

module.exports = followActions;
