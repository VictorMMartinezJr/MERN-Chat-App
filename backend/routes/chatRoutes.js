const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
} = require("../controllers/chatControllers");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, accessChat);
router.get("/", requireAuth, fetchChats);
router.post("/group", requireAuth, createGroupChat);
// router.put("/rename", requireAuth, renameGroupChat);
// router.put("/groupremove", requireAuth, removeFromGroup);
// router.put("/groupadd", requireAuth, addToGroup);

module.exports = router;
