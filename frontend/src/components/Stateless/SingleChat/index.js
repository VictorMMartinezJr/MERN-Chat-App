import "./SingleChat.css";
import { useContext, useEffect, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import { FaUserEdit } from "react-icons/fa";
import UpdateGCModal from "../UpdateGCModal";
import ScrollableChat from "../ScrollableChat";
import axios from "axios";
import { getSender } from "../ChatLogic";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = useContext(Chat);
  const [openGCModal, setOpenGCModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

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

        console.log(data);
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
    <section className="single-chats-container">
      <div className="single-chat-header">
        {selectedChat ? (
          <>
            {selectedChat.isGroupChat ? (
              <h1 className="chat-title">{selectedChat.chatName}</h1>
            ) : (
              <h1>{getSender(user, selectedChat.users)}</h1>
            )}
          </>
        ) : (
          <p>No Chat Selected</p>
        )}
        <FaUserEdit
          className="update-gc-btn"
          onClick={() => setOpenGCModal(true)}
        />
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
