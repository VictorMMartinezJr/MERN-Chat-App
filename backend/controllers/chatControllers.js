const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not sent with req");
    return res.sendStatus(400);
  }

  let isChat = await await Chat.find({
    isGroupChat: false,
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

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatNamee: "sender",
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

module.exports = accessChat;
