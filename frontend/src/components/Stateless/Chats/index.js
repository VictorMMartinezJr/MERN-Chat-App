import "./Chats.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "../../../context/ChatProvider";
import NewGroupModal from "../NewGroupModal";

const Chats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { user, chats, setChats, setSelectedChat } = useContext(Chat);

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

  const getSender = (loggedInUser, users) => {
    return users[0]._id === loggedInUser._id ? users[1].name : users[0].name; // Make sure logged user sees recipients name, not his own
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);

  console.log(chats);
  return (
    <section className="chats-section">
      <span className="chats-header">
        <h1 className="chats-title">My Chats</h1>
        <button className="new-chat-btn" onClick={() => setModalOpen(true)}>
          New Group
        </button>
      </span>
      <NewGroupModal modalOpen={modalOpen} />
      <div className="single-chats">
        {chats ? (
          <div className="single-chat">
            {chats.map((chat) => {
              return (
                <p key={chat._id}>
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users) : ""}
                </p>
              );
            })}
          </div>
        ) : (
          <p>No chats</p>
        )}
      </div>
    </section>
  );
};

export default Chats;
