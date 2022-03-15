import "./Chats.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "../../../context/ChatProvider";
import NewGroupModal from "../Modals/NewGroupModal";
import { getSender } from "../ChatLogic";
import { FiSearch } from "react-icons/fi";
import sadMessage from "../../../assets/images/sad-message.svg";

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

  const iPadScreen = window.matchMedia("(max-width: 1024px)"); // For conditional rendering on smaller screens

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

  useEffect(() => {
    setLoggedUser(user);
  });

  // Fetch user again if empty on first render
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
          <div className="no-chats">
            <h1>No chats</h1>
            <img src={sadMessage} alt="sad-message" />
          </div>
        )}
      </>
    </section>
  );
};

export default Chats;
