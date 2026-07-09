const express = require("express");
const { getUserProfile } = require("../controller/user.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);

module.exports = router;
