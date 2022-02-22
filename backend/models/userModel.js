const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true, default: "./default-user.svg" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
