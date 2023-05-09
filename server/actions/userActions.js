const bcrypt = require("bcryptjs");
const getDatabaseCon = require("../utils/db");

const jwt = require("jsonwebtoken");
const { ObjectId, BSONSymbol } = require("mongodb");

const userActions = {
	async create({
		username,
		email,
		fname,
		lname,
		password,
		bio,
		category,
		imageLinks,
	}) {
		const { db, client } = await getDatabaseCon();

		username = username.trim();
		email = email.trim();
		password = password.trim();

		const salt = await bcrypt.genSalt(8);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userModel = Object.assign(userActions.defaultObj(), {
			username,
			email,
			password: hashedPassword,
			fname,
			lname,
			profile: {
				...userActions.defaultObj().profile,
				status: this.accountStatus.ONLINE,
			},
			bio,
			category,
			imageLinks,
			createdAt: Date.now(),
		});

		await db.collection("users").insertOne(userModel);
		await client.close();

		return {
			...this._exclude(userModel, "password", "imageLinks"),
			imageLinks: {
				url: imageLinks.url,
			},
		}; // Similar to select("-password");
	},
	async find({ username, email }) {
		const { db, client } = await getDatabaseCon();

		const userExists = await db.collection("users").findOne({
			$or: [{ email: { $eq: email } }, { username: { $eq: username } }],
		});

		await client.close();
		return userExists;
	},

	async findById({ id }) {
		const { db, client } = await getDatabaseCon();
		const user = await db
			.collection("users")
			.findOne({ _id: new ObjectId(id) });
		await client.close();
		return user;
	},

	async delete({ username }) {
		const { db, client } = await getDatabaseCon();

		const res = await db.collection("users").deleteOne({ username });
		await client.close();
		return res;
	},

	async deactivate({ username }) {
		const { db, client } = await getDatabaseCon();

		const user = await db
			.collection("users")
			.updateOne({ username }, { $set: { "account.isDeactivated": true } });

		await client.close();
		return user;
	},

	async block({ username, blockee }) {
		const { db, client } = await getDatabaseCon();

		const user = await db
			.collection("users")
			.updateOne({ username }, { $push: { blockList: blockee } });

		await client.close();
		return user;
	},
	async unblock({ username, blockee }) {
		const { db, client } = await getDatabaseCon();

		const user = await db
			.collection("users")
			.updateOne({ username }, { $pop: { blockList: blockee } });

		await client.close();
		return user;
	},

	async follow({ userId, followerId }) {
		const { db, client } = await getDatabaseCon();

		const isAlreadyFollowing = await db.collection("followers").findOne({
			userId: { $eq: userId },
			followerId: { $eq: followerId },
		});

		if (isAlreadyFollowing) {
			return;
		}

		const followObj = {
			userId,
			followerId,
			followDate: Date.now(),
		};
		await db.collection("followers").insertOne(followObj);
		await client.close();
	},

	async setPrivate({ username }) {
		const { db, client } = await getDatabaseCon();
		await db
			.collection("users")
			.updateOne({ username }, { $set: { "profile.isPrivate": true } });
		await client.close();
	},
	async setPublic({ username }) {
		const { db, client } = await getDatabaseCon();
		const res = await db
			.collection("users")
			.updateOne({ username }, { $set: { "profile.isPrivate": false } });
		await client.close();
		return res;
	},

	async setStatus({ username, field, status }) {
		const { db, client } = await getDatabaseCon();

		const res = await db.collection("users").findOneAndUpdate(
			{
				username,
			},
			{
				$set: {
					[`profile.${field}`]: status,
				},
			},
			{
				returnDocument: "after",
			}
		);

		await client.close();
		return res.value;
	},

	_exclude(object, ...keys) {
		const key = keys.pop();
		if (key === undefined || !key.length) {
			return object;
		} else {
			const { [key]: ignored, ...rest } = object;
			return this._exclude(rest, keys);
		}
	},
	_notValidUsername(username) {
		const re = new RegExp(/@$|@|^@|[$&+,:;=?@#|'<>.^*()%!-]/g);
		const userName = username.trim();
		return re.test(userName);
	},

	async compareHash({ plainText, hashed }) {
		return await bcrypt.compare(plainText, hashed);
	},

	defaultObj() {
		return {
			username: "",
			email: "",
			password: "",
			fname: "",
			lname: "",
			bio: "",
			category: "",
			createdAt: 0,
			profile: {
				isPrivate: false,
				isEmployed: false,
				lastSeen: 0,
				status: "",
			},
			account: {
				active: true,
			},
			warnings: [],
			imageLinks: {},
		};
	},

	getSafeUser(user) {
		return this._exclude(user, "password");
	},

	accountStatus: {
		ONLINE: new BSONSymbol("ONLINE"),
		OFFLINE: new BSONSymbol("OFFLINE"),
		IDLE: new BSONSymbol("IDLE"),
	},

	generateJWTToken({ user }) {
		// generate a jwt token
		return jwt.sign(
			{
				userId: user._id,
				username: user.username,
			},
			process.env.JWT_CODE,
			{
				expiresIn: process.env.JWT_EXPIRY,
			}
		);
	},

	notAllowedUsernames() {
		return [
			"admin",
			"create",
			"update",
			"delete",
			"block",
			"login",
			"logout",
			"index",
			"index.html",
			"styles.css",
			"index.php",
			"script.php",
		];
	},
};

module.exports = userActions;
