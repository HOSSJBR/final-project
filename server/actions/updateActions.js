const getDatabaseCon = require("../utils/db");

const updateActions = {
	async updatePassword({ username, newPassword }) {
		const { db, client } = await getDatabaseCon();

		const salt = await bcrypt.genSalt(8);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		await db.collection("users").findOneAndUpdate(
			{
				username,
			},
			{
				$set: { $password: hashedPassword },
			},
			{
				returnDocument: "after",
			}
		);

		await client.close();
	},

	async updateUsername({ username, newUsername }) {
		const { db, client } = await getDatabaseCon();

		const userFound = await db.collection("users").findOne({ username });
		if (userFound) {
			await client.close();
			return false;
		}

		await db.collection("users").findOneAndUpdate(
			{
				username,
			},
			{
				$set: { username: newUsername },
			}
		);
		await client.close();
		return true;
	},
};

module.exports = updateActions;
