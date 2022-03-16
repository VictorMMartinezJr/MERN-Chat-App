import "./UpdateGCModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import AddedToGroupBadge from "../../AddedToGroupBadge";
import axios from "axios";
import { SearchedModalUser } from "../../SearchedUser";
import { Chat } from "../../../../context/ChatProvider";

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
  const [addToGroupError, setAddToGroupError] = useState("");
  const [renameGroupError, setRenameGroupError] = useState("");
  const [topInputActive, setTopInputActive] = useState(false);
  const [bottomInputActive, setBottomInputActive] = useState(false);

  const renameGC = async (e) => {
    e.preventDefault();

    if (!groupChatName) {
      setRenameGroupError("Input empty"); // Display error if no groupChatName input when called
      return;
    }

    if (groupChatName.length > 15) {
      setRenameGroupError("Max chat name length is 15"); // Display error if no groupChatName exceeds 15
      return;
    }

    // Rename GC
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
      setOpenGCModal(false);
    } catch (err) {
      setRenameGroupError(err.message);
    }
    setGroupChatName("");
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
      if (data.length === 0) {
        setAddToGroupError("User not found"); // Set Error if user not found in database
      }
      setSearchResults(data);
    } catch (err) {
      setAddToGroupError(err.message);
    }
  };

  const removeUser = async (user1) => {
    // Check if user calling removeUser is the admin
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      setAddToGroupError("Only admins can remove users");
      return;
    }

    // Remove User
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
      setAddToGroupError(err.message);
    }
  };

  const handleGroup = async (user1) => {
    // Check if user being added already exists in GC
    if (selectedChat.users.find((user) => user._id === user1._id)) {
      setAddToGroupError("User already in groupchat");
      return;
    }

    // Check if user calling removeUser is the admin
    if (selectedChat.groupAdmin._id !== user._id) {
      setAddToGroupError("Only Admins can add users");
      return;
    }

    // Add User
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
      setAddToGroupError(err.message);
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
            setRenameGroupError("");
            setAddToGroupError("");
          }}
        />
        <h1 className="update-modal-header">{selectedChat.chatName}</h1>
        <div className="user-badges">
          {selectedChat &&
            selectedChat.users.map((user) => (
              <AddedToGroupBadge
                key={user._id}
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
              className={
                topInputActive
                  ? "rename-gc-input active-input"
                  : "rename-gc-input"
              }
              value={groupChatName}
              onFocus={() => {
                setTopInputActive(true); // Add active bottom border
                setRenameGroupError(""); // Remove errors
              }}
              onBlur={() => {
                setTopInputActive(false); // Remove active bottom border
              }}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <p className="rename-gc-error">{renameGroupError}</p>
            <button className="update-group-btn" onClick={renameGC}>
              Update
            </button>
          </div>
          <div className="gc-input-container">
            <input
              type="text"
              placeholder="Add Users To Group"
              className={
                bottomInputActive
                  ? "rename-gc-input active-input"
                  : "rename-gc-input"
              }
              value={search}
              onFocus={() => {
                setBottomInputActive(true); // Add active bottom border
                setAddToGroupError(""); // Remove errors
              }}
              onBlur={() => setBottomInputActive(false)} // Remove active bottom border
              onChange={(e) => handleSearch(e.target.value)}
            />
            <p className="add-gc-error">{addToGroupError}</p>
          </div>
        </form>
        {searchResults?.slice(0, 4).map((user) => {
          // Only allow 4 search results at once
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
          {selectedChat &&
          selectedChat.isGroupChat &&
          selectedChat.groupAdmin._id === user._id
            ? "Delete Group Chat"
            : "Leave Group Chat"}
        </button>
      </div>
    </div>
  );
};

export default UpdateGCModal;
