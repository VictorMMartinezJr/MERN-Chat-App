const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false, // Must not be a group chat for it to be a 1on1 chat

    // Both users need to exist
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name , avatar, email",
  });

  // Check if chat already exists
  if (isChat.length > 0) {
    res.send(isChat[0]); // Send chat if it already exists
  } else {
    // Create chat info needed to create a new chat
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const newChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: newChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(fullChat);
    } catch (err) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.chatName) {
    return res.status(400).send({ message: "Please fill out all the fields" });
  }

  let users = JSON.parse(req.body.users); // Turn stringified data from frontend into an object

  if (users.length < 2) {
    res.status(400).send("More than 2 users needed to create a group chat");
  }

  users.push(req.user); // Add currently logged in user to group chat

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const newGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(newGroupChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { accessChat, fetchChats, createGroupChat };
