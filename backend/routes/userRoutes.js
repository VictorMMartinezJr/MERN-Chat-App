const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", requireAuth, allUsers);

module.exports = router;
