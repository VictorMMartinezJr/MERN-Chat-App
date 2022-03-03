import { useContext } from "react";
import { Chat } from "../../../context/ChatProvider";
import "./SearchedUser.css";

const SearchedUser = ({ searchedUser }) => {
  const { user } = useContext(Chat);
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
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="searched-user" onClick={() => accessChat(searchedUser._id)}>
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

export default SearchedUser;
