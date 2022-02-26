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

  // Check for user email
  const user = await User.findOne({ email });

  try {
    {
      user && (await user.matchPassword(password));
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
});

module.exports = { registerUser, authUser };
