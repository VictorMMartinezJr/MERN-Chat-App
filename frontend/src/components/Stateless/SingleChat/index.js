import "./SingleChat.css";
import { useContext, useEffect, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import { FaUserEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import UpdateGCModal from "../UpdateGCModal";
import ScrollableChat from "../ScrollableChat";
import axios from "axios";
import { getSender, getSenderAvatar } from "../ChatLogic";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, setiPadSearch } =
    useContext(Chat);
  const [openGCModal, setOpenGCModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  const iPadScreen = window.matchMedia("(max-width: 1024px)");

  const fetchAllMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Capitalize first letter in chat name
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchAllMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <section className="chatbox-container">
      <div className="chatbox-header">
        {selectedChat && iPadScreen.matches && (
          <IoMdArrowBack
            className="single-chat-back-arrow"
            onClick={() => setSelectedChat("")}
          />
        )}
        {selectedChat ? (
          <>
            {selectedChat.isGroupChat ? (
              <h1 className="chatbox-groupchat-title">
                {selectedChat.chatName}
              </h1>
            ) : (
              <div className="single-chat-header">
                <img
                  src={getSenderAvatar(user, selectedChat.users)}
                  alt="chat-user-avatar"
                />
                <h1 className="chat-title">
                  {toUpperCase(getSender(user, selectedChat.users))}
                </h1>
              </div>
            )}
          </>
        ) : (
          <p className="no-chat-header">Select a chat to start chatting!</p>
        )}
        <span className="single-chat-icons">
          {selectedChat && (
            <FaUserEdit
              className="update-gc-btn"
              onClick={() => setOpenGCModal(true)}
            />
          )}
          {selectedChat && iPadScreen.matches && (
            <FiSearch
              className="search-user-icon"
              onClick={() => {
                setiPadSearch(true);
              }}
            />
          )}
        </span>
        <UpdateGCModal
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          openGCModal={openGCModal}
          setOpenGCModal={setOpenGCModal}
          fetchAllMessages={fetchAllMessages}
        />
      </div>
      <div className="messages-container">
        <ScrollableChat messages={messages} />
        <input
          onKeyDown={sendMessage}
          type="text"
          placeholder="Write a message"
          value={newMessage}
          onChange={typingHandler}
          className="messages-input"
        />
      </div>
    </section>
  );
};

export default SingleChat;
