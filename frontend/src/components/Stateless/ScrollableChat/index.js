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
            <span
              className="message"
              style={{
                background: `${
                  message.sender._id === user._id
                    ? "linear-gradient(to right, #00c6ff,#0072ff)"
                    : "#e4e3e3"
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
