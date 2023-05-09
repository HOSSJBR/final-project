const getDatabaseCon = require("../utils/db");

const searchActions = {
	async search({ term }) {
		const { db, client } = await getDatabaseCon();
		const users = await db
			.collection("users")
			.find({
				$or: [
					{ username: { $regex: term, $options: "i" } },
					{ fname: { $regex: term, $options: "i" } },
					{ lname: { $regex: term, $options: "i" } },
				],
			})
			.toArray();

		await client.close();
		return users;
	},
};

module.exports = searchActions;
