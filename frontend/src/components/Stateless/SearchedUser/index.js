import { useContext, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import "./SearchedUser.css";

export const SearchedUser = ({ searchedUser }) => {
  const { user, chats, setChats, setSelectedChat, setiPadSearch } =
    useContext(Chat);
  const [searchedUserError, setSearchedUserError] = useState("");

  // Capitalize first letter in user info
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Create or fetch 1v1 chat
  const accessChat = async (userId) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      // Add chat to chats list if it doesn't exist
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
        setSelectedChat(data);
        setiPadSearch(false); // Make chatbox fullscreen after clicking on user on (max-width: 1024px)
      }

      setiPadSearch(false);
      setSelectedChat(data);
    } catch (error) {
      setSearchedUserError(error.message);
    }
  };

  return (
    <>
      <div
        className="searched-user"
        onClick={() => accessChat(searchedUser._id)}
      >
        <img
          src={searchedUser.avatar}
          alt="user-avatar"
          className="searched-user-img"
        />
        <div className="searched-user-info">
          <p className="searched-user-name">{toUpperCase(searchedUser.name)}</p>
          <p className="searched-user-email">
            {toUpperCase(searchedUser.email)}
          </p>
        </div>
      </div>
      <p className="searched-user-error">{searchedUserError}</p>
    </>
  );
};

export const SearchedModalUser = ({ searchedUser, onClick }) => {
  // Capitalize first letter in user info
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="searched-user" onClick={onClick}>
      <img
        src={searchedUser.avatar}
        alt="user-avatar"
        className="searched-user-img"
      />
      <div className="searched-user-info">
        <p className="searched-user-name">{toUpperCase(searchedUser.name)}</p>
        <p className="searched-user-email">{toUpperCase(searchedUser.email)}</p>
      </div>
    </div>
  );
};
