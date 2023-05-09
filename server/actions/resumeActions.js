const { ObjectId } = require("mongodb");
const getDatabaseCon = require("../utils/db");

const resumeActions = {
	async create({ author, resume }) {
		const { db, client } = await getDatabaseCon();

		const res = await db.collection("resumes").insertOne({ ...resume, author });
		await client.close();
		return res;
	},

	async replace({ author, resume }) {
		const { db, client } = await getDatabaseCon();

		const newDoc = {
			...resume,
			author,
		};
		const res = await db.collection("resumes").replaceOne(
			{
				"author.username": { $eq: author.username },
			},
			newDoc
		);

		await client.close();
		return res;
	},

	async delete({}) {},

	async getResumeById({ id }) {},

	async getResumeByUsername({ username }) {
		const { db, client } = await getDatabaseCon();

		const resume = await db
			.collection("resumes")
			.findOne({ "author.username": username });

		await client.close();
		return resume;
	},

	async getResumeById({ userId }) {
		const { db, client } = await getDatabaseCon();

		const resume = await db
			.collection("resumes")
			.findOne({ "author.userId": new ObjectId(userId) });

		await client.close();
		return resume;
	},
};

module.exports = resumeActions;
