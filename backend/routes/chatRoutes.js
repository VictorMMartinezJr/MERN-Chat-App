const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
} = require("../controllers/chatControllers");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireAuth, accessChat);
router.get("/", requireAuth, fetchChats);
router.post("/group", requireAuth, createGroupChat);
router.put("/rename", requireAuth, renameGroupChat);
// router.put("/groupadd", requireAuth, addToGroup);
// router.put("/groupremove", requireAuth, removeFromGroup);

module.exports = router;
