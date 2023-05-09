const router = require("express").Router();
const userHandlers = require("../handlers/userHandlers.js");
const isAuth = require("../middlewares/authMiddleware.js");

router.route("/create").post(userHandlers.createUser);
router.route("/login").post(userHandlers.loginUser);

router.route("/block").post(isAuth, userHandlers.blockUser);
router.route("/logout").get(isAuth, userHandlers.logoutUser);

router.route("/me").get(isAuth, userHandlers.getMe);

router.route("/:username").get(userHandlers.getUser);

// router.route("/unblock").post(isAuth, userHandlers.unblockUser);

module.exports = router;
