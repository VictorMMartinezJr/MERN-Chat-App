const express = require("express");
const { sendMessage } = require("../controllers/messageControllers");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, sendMessage);
// router.get("/:chatId", requireAuth, allMessages);

module.exports = router;
