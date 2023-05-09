const express = require("express");
const isAuth = require("../middlewares/authMiddleware");
const resumeHandlers = require("../handlers/resumeHandlers");
const router = express.Router();

router.route("/create").post(isAuth, resumeHandlers.createResume);

module.exports = router;
