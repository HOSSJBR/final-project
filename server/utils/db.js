"use strict";

require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const getDatabaseCon = async (dbName = "TalentTracer") => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db(dbName);
	return {
		db,
		client,
	};
};

module.exports = getDatabaseCon;
