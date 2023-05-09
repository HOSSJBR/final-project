const express = require("express");
const searchHandlers = require("../handlers/searchHandlers");
const router = express.Router();

router.route("/").get(searchHandlers.getUsersFromSearchTerm);
router.route("/followers").get(searchHandlers.getFollowers);
router.route("/following").get(searchHandlers.getFollowing);

module.exports = router;
