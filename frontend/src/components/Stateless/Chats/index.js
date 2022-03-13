import "./Chats.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "../../../context/ChatProvider";
import NewGroupModal from "../NewGroupModal";
import { getSender, getSenderAvatar } from "../ChatLogic";
import { FiSearch } from "react-icons/fi";

const Chats = ({ setFetchAgain, fetchAgain }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    iPadSearch,
    setiPadSearch,
  } = useContext(Chat);

  const iPadScreen = window.matchMedia("(max-width: 1024px)");

  const fetchChats = async () => {
    if (!user) {
      return;
    }

    // Fetch data
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Capitalize first letter in chat name
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fetch user again if empty on first render
  useEffect(() => {
    setLoggedUser(user);
  });

  useEffect(() => {
    fetchChats();
  }, [loggedUser]);

  return (
    <section
      className={
        (selectedChat && iPadScreen.matches) ||
        (selectedChat && iPadSearch) ||
        (!selectedChat && iPadSearch)
          ? "chats-section-ipad"
          : "chats-section"
      }
    >
      <span className="chats-header">
        <h1 className="chats-title">Chats</h1>
        <span className="chats-btns">
          <button className="new-chat-btn" onClick={() => setModalOpen(true)}>
            New Group
          </button>
          {iPadScreen.matches && (
            <FiSearch
              className="chats-search-icon"
              onClick={() => setiPadSearch(true)}
            />
          )}
        </span>
      </span>
      <NewGroupModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <>
        {chats.length > 0 ? (
          <div className="single-chats">
            {chats.map((chat) => {
              return (
                <div
                  key={chat._id}
                  className={
                    selectedChat._id === chat._id
                      ? "single-chat active-single-chat"
                      : "single-chat"
                  }
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                >
                  <p>
                    {user && !chat.isGroupChat
                      ? toUpperCase(getSender(user, chat.users))
                      : chat.chatName}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No chats</p>
        )}
      </>
    </section>
  );
};

export default Chats;
