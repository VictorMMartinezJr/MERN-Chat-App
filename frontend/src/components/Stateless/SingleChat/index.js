import "./SingleChat.css";
import { useContext, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import { HiUserGroup } from "react-icons/hi";
import UpdateGCModal from "../UpdateGCModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useContext(Chat);
  const [openGCModal, setOpenGCModal] = useState(false);
  return (
    <section className="single-chats-container">
      <div className="single-chat-header">
        {selectedChat ? (
          <>
            {selectedChat.isGroupChat ? (
              <h1 className="chat-title">{selectedChat.chatName}</h1>
            ) : (
              <p>Not a group chat</p>
            )}
          </>
        ) : (
          <p>No Chat Selected</p>
        )}
        <HiUserGroup
          className="update-gc-btn"
          onClick={() => setOpenGCModal(true)}
        />
        <UpdateGCModal
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          openGCModal={openGCModal}
          setOpenGCModal={setOpenGCModal}
        />
      </div>
      <div className="messages-container"></div>
    </section>
  );
};

export default SingleChat;
