import "./ScrollableChat.css";
import { useContext, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Chat } from "../../../context/ChatProvider";
import {
  messageTextColor,
  isSameUser,
  sameSenderJustifyContent,
} from "../ChatLogic";

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(Chat);

  return (
    <ScrollableFeed className="scrollable-feed">
      {messages &&
        messages.map((message, i) => (
          <div
            key={message._id}
            className="message-container"
            style={{
              justifyContent: sameSenderJustifyContent(
                messages,
                message,
                i,
                user._id
              ),
            }}
          >
            <img
              className="message-avatar"
              src={message.sender.avatar}
              alt="message-avatar"
            />
            <span
              className="message"
              style={{
                background: `${
                  message.sender._id === user._id ? "#da0037" : "#e4e3e3"
                }`,
                color: messageTextColor(messages, message, i, user._id),
                marginTop: isSameUser(messages, message, i, user._id) ? 3 : 10,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
