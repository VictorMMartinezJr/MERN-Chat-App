import "./NewGroupModal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import axios from "axios";
import SearchedUser from "../SearchedUser";

const NewGroupModal = ({ modalOpen, setModalOpen }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, chats, setChats } = useContext(Chat);

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
  const handleSubmit = () => {};
  const handleGroup = () => {};

  return (
    <div
      className={
        modalOpen
          ? "new-group-modal-container modal-active"
          : "new-group-modal-container"
      }
    >
      <div className="new-group-modal">
        <AiFillCloseCircle
          className="close-modal-btn"
          onClick={() => setModalOpen(false)}
        />
        <h1 className="modal-header">Create New Group Chat</h1>
        <form className="modal-form">
          <input
            type="text"
            placeholder="Chat Name"
            onChange={(e) => setGroupChatName(e.target.value)}
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Add Users To Group"
            className="modal-input"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
        {searchResults?.slice(0, 4).map((user) => {
          return (
            <SearchedUser
              key={user._id}
              searchedUser={user}
              onClick={handleGroup}
            />
          );
        })}
        <button className="modal-submit-btn" onClick={handleSubmit}></button>
      </div>
    </div>
  );
};

export default NewGroupModal;
