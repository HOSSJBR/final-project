"use strict";
require("dotenv").config();
const userActions = require("../actions/userActions");
const getDatabaseCon = require("../utils/db");
const cloudinary = require("cloudinary");

const uploadImage = async (image, folder) => {
	const result = await cloudinary.v2.uploader.upload(image, {
		folder,
		width: 150,
		crop: "scale",
	});

	return result;
};

const userHandlers = {
	async createUser(req, res, next) {
		let { username, email, fname, lname, password, bio, category, image } =
			req.body;

		if (userActions.notAllowedUsernames().includes(username.trim())) {
			return res.status(400).json({
				status: 400,
				message: `Username is not allowed`,
			});
		}
		try {
			const userExists = await userActions.find({ email, username });
			if (userExists) {
				return res.status(400).json({
					status: 400,
					message: `Email or username is already in use.`,
				});
			}

			username = username.trim();

			if (
				userActions._notValidUsername(username) ||
				!username ||
				username.length < 2
			) {
				return res
					.status(422)
					.json({ status: 422, message: `Invalid username handle.` });
			}

			let imageUpload;
			if (image) {
				imageUpload = await uploadImage(image, "profile");
				if (imageUpload === null) {
					return res.status(403).json({
						status: 403,
						message: `Error Uploading image`,
					});
				}
			}

			const imageLinks = {
				public_id: imageUpload?.public_id,
				url: imageUpload?.secure_url,
			};
			const createdUser = await userActions.create({
				username,
				email,
				password,
				fname,
				lname,
				bio,
				category,
				imageLinks,
			});

			const token = userActions.generateJWTToken({ user: createdUser });
			createdUser.token = token;

			return res.status(200).json({
				status: 200,
				user: createdUser,
				message: `@${createdUser.username}, Welcome to TalentTracer!`,
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	async getUser(req, res, next) {
		const { username } = req.params;

		const userFound = await userActions.find({ username });
		if (!userFound) {
			return res
				.status(404)
				.json({ status: 404, message: `@${username} is not found!` });
		}

		const user = userActions._exclude(userFound, "password", "imageLinks");

		return res.status(200).json({
			status: 200,
			user: {
				...user,
				imageLinks: {
					url: userFound.imageLinks.url,
				},
			},
		});
	},

	async getMe(req, res, next) {
		if (req.user) {
			return res.status(200).json({
				status: 200,
				user: req.user,
			});
		}
		return res.status(401).json({
			status: 401,
			message: `Unauthorized`,
		});
	},

	async loginUser(req, res, next) {
		const { username, password } = req.body;

		try {
			const user = await userActions.find({ username });

			if (!user) {
				return res
					.status(404)
					.json({ status: 404, message: `@${username} does not exist.` });
			}

			const isCorrectCredentials = await userActions.compareHash({
				plainText: password,
				hashed: user.password,
			});

			if (!isCorrectCredentials) {
				return res
					.status(403)
					.json({ status: 403, message: `Incorrect username or password.` });
			}

			await userActions.setStatus({
				username: user.username,
				field: "status",
				status: userActions.accountStatus.ONLINE,
			});
			const updated = await userActions.setStatus({
				username: user.username,
				field: "lastSeen",
				status: 0,
			});

			const { io } = global;

			io.emit("onStatusChange", userActions.getSafeUser(updated));

			const safe = userActions.getSafeUser(updated);

			const safeUser = {
				...safe,
				token: userActions.generateJWTToken({ user }),
			};

			return res.status(200).json({
				status: 200,
				user: safeUser,
				message: `Welcome to @TalentTracer!.`,
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	async logoutUser(req, res, next) {
		const { user } = req;

		if (!user) {
			return res.status(404).json({
				status: 404,
				message: `An error has ocurred`,
			});
		}

		await userActions.setStatus({
			username: user.username,
			field: "status",
			status: userActions.accountStatus.OFFLINE,
		});

		const updated = await userActions.setStatus({
			username: user.username,
			field: "lastSeen",
			status: Date.now(),
		});

		const { io } = global;

		io.emit("onStatusChange", userActions.getSafeUser(updated));

		return res.status(200).json({
			status: 200,
			message: `Logged out successfully.`,
		});
	},
	async blockUser(req, res, next) {
		const { username, blockee } = req.body;

		await userActions.block({ username, blockee });
		return res.status(200).json({ success: true });
	},
};

module.exports = userHandlers;
