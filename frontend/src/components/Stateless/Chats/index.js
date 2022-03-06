import "./Chats.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "../../../context/ChatProvider";
import NewGroupModal from "../NewGroupModal";

const Chats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { user, chats, setChats, selectedChat, setSelectedChat } =
    useContext(Chat);

  const fetchChats = async () => {
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

  // Make sure logged user sees recipients name, not his own
  const getSender = (loggedInUser, users) => {
    return users[0]._id === loggedInUser._id ? users[1].name : users[0].name;
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);

  return (
    <section className="chats-section">
      <span className="chats-header">
        <h1 className="chats-title">My Chats</h1>
        <button className="new-chat-btn" onClick={() => setModalOpen(true)}>
          New Group
        </button>
      </span>
      <NewGroupModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <>
        {chats ? (
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
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
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
