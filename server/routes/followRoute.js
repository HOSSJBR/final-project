const express = require("express");
const followHandlers = require("../handlers/followHandlers");
const router = express.Router();

router.route("/follow").post(followHandlers.followUser);
router.route("/unfollow").post(followHandlers.unfollowUser);

module.exports = router;
