import "./SingleChat.css";
import { useContext, useEffect, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import { FaUserEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import UpdateGCModal from "../Modals/UpdateGCModal";
import ScrollableChat from "../ScrollableChat";
import Loader from "../Loader";
import axios from "axios";
import { getSender, getSenderAvatar } from "../ChatLogic";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, setiPadSearch, chats } =
    useContext(Chat);
  const [openGCModal, setOpenGCModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [messagesError, setMessagesError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const iPadScreen = window.matchMedia("(max-width: 1024px)"); // For conditional rendering on smaller screens

  const fetchAllMessages = async () => {
    setIsLoading(true);
    if (!selectedChat) return;

    // Fetch messages
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
      setIsLoading(false);
    } catch (err) {
      setMessagesError(err.message);
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
        setMessagesError(err.message);
      }
    }
  };

  return (
    <section className="chatbox-container">
      <div className="chatbox-header">
        {selectedChat ? (
          <>
            {selectedChat.isGroupChat ? (
              <div className="chatbox-header-left">
                {iPadScreen.matches && (
                  <IoMdArrowBack
                    className="single-chat-back-arrow"
                    onClick={() => setSelectedChat("")}
                  />
                )}
                <h1 className="chatbox-groupchat-title">
                  {selectedChat.chatName}
                </h1>
                <p className="input-error">{messagesError}</p>
              </div>
            ) : (
              <div className="chatbox-header-left">
                {iPadScreen.matches && (
                  <IoMdArrowBack
                    className="single-chat-back-arrow"
                    onClick={() => setSelectedChat("")}
                  />
                )}
                <span className="chatbox-user-title">
                  <img
                    src={getSenderAvatar(user, selectedChat.users)}
                    alt="chat-user-avatar"
                  />
                  <h1 className="chat-title">
                    {toUpperCase(getSender(user, selectedChat.users))}
                  </h1>
                </span>
                <p className="input-error">{messagesError}</p>
              </div>
            )}
          </>
        ) : (
          <p className="chatbox-header">
            {chats.length > 0
              ? "Select a chat to start chatting!"
              : "Search for users to start chatting!"}
          </p>
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
      {isLoading && selectedChat && <Loader className="messages-loader" />}
      <div className="messages-container">
        {!isLoading && <ScrollableChat messages={messages} />}
        {!isLoading && (
          <input
            onKeyDown={sendMessage}
            type="text"
            placeholder="Write a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="messages-input"
          />
        )}
      </div>
    </section>
  );
};

export default SingleChat;
