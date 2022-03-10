import "./Chats.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "../../../context/ChatProvider";
import NewGroupModal from "../NewGroupModal";
import { getSender } from "../ChatLogic";

const Chats = ({ setFetchAgain, fetchAgain }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const { user, chats, setChats, selectedChat, setSelectedChat } =
    useContext(Chat);

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
      console.log("data: ", data);
      setChats(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Fetch user again if empty on first render
  useEffect(() => {
    setLoggedUser(user);
  });

  useEffect(() => {
    fetchChats();
  }, [loggedUser]);

  return (
    <section className="chats-section">
      <span className="chats-header">
        <h1 className="chats-title">My Chats</h1>
        <button className="new-chat-btn" onClick={() => setModalOpen(true)}>
          NEW GROUP
        </button>
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
                      ? getSender(user, chat.users)
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
