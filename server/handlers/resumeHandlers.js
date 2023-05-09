const resumeActions = require("../actions/resumeActions");
const getDatabaseCon = require("../utils/db");

const resumeHandlers = {
	async createResume(req, res, next) {
		try {
			const { resume } = req.body;
			const { db, client } = await getDatabaseCon();

			const existingResume = await resumeActions.getResumeByUsername({
				username: req.user.username,
			});

			const author = {
				username: req.user.username,
				userId: req.user._id,
			};
			if (!existingResume) {
				await resumeActions.create({ author, resume });
				return res.status(200).json({
					status: 200,
					message: `Resume created successfully!`,
				});
			}
			await resumeActions.replace({ author, resume });
			return res.status(200).json({
				status: 200,
				message: `Resume updated successfully!`,
			});
		} catch (err) {
			return next(err);
		}
	},
};

module.exports = resumeHandlers;
