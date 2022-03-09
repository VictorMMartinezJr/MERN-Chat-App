import "./UpdateGCModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import AddedToGroupBadge from "../AddedToGroupBadge";
import axios from "axios";
import { SearchedModalUser } from "../SearchedUser";

const UpdateGCModal = ({
  fetchAgain,
  setFetchAgain,
  openGCModal,
  setOpenGCModal,
  fetchAllMessages,
}) => {
  const { selectedChat, setSelectedChat, user } = useContext(Chat);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const renameGC = async (e) => {
    e.preventDefault();
    if (!groupChatName) {
      console.log("No Inpout");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.log(err.message);
    }
    setGroupChatName("");
    console.log(groupChatName);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResults(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeUser = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      console.log("Only admins can remove users");
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userToRemove: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchAllMessages();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleGroup = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.log("User Already In GC");
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      console.log("Only Admins can add users");
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          newUser: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className={
        openGCModal
          ? "update-gc-modal-container modal-active"
          : "update-gc-modal-container"
      }
    >
      <div className="update-group-modal">
        <AiFillCloseCircle
          className="close-modal-btn"
          onClick={() => {
            setOpenGCModal(false);
            setGroupChatName("");
            setSearch("");
            setSearchResults([]);
          }}
        />
        <h1 className="update-modal-header">{selectedChat.chatName}</h1>
        <div className="user-badges">
          {selectedChat &&
            selectedChat.users.map((user) => (
              <AddedToGroupBadge
                key={user.id}
                selectedUser={user}
                handleDelete={() => removeUser(user)}
              />
            ))}
        </div>
        <form className="gc-modal-form">
          <div className="gc-input-container">
            <input
              type="text"
              placeholder="Rename Group Chat"
              className="rename-gc-input"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <button className="update-group-btn" onClick={renameGC}>
              Update
            </button>
          </div>
          <div className="gc-input-container">
            <input
              type="text"
              placeholder="Add Users To Group"
              className="rename-gc-input"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </form>
        {searchResults?.slice(0, 4).map((user) => {
          return (
            <SearchedModalUser
              key={user._id}
              searchedUser={user}
              onClick={() => handleGroup(user)}
            />
          );
        })}
        <button
          className="leave-gc-btn"
          onClick={() => {
            removeUser(user);
            setOpenGCModal(false);
          }}
        >
          Leave Group Chat
        </button>
      </div>
    </div>
  );
};

export default UpdateGCModal;
