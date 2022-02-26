const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const handleErrors = require("../middleware/errorMiddleware");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Return every user from above except logged in user
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
