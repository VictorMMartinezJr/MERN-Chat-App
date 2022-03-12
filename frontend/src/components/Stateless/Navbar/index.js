import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Chat } from "../../../context/ChatProvider";
import MyProfileModal from "../Modals/MyProfileModal";

const Navbar = () => {
  const { user, setUser, setChats, setSelectedChat } = useContext(Chat);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const history = useHistory();

  const logUserOut = () => {
    // Clear global states and local storage
    localStorage.clear();
    setUser({});
    setChats([]);
    setSelectedChat("");
    history.push("/");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Chit Chat</h1>
      <div className="right-nav">
        <div
          className="nav-user"
          onClick={() => setUserMenuActive(!userMenuActive)}
        >
          <img
            className="user-avatar"
            src={user === null || user === undefined ? "" : user.avatar}
            alt="avatar"
          />
          <AiFillCaretDown className="arrow-icon" />
          <div
            className={
              userMenuActive ? "nav-user-menu active" : "nav-user-menu"
            }
          >
            <p onClick={() => setOpenProfile(true)}>My Profile</p>
            <p onClick={() => logUserOut()}>Log out</p>
          </div>
        </div>
      </div>
      {user && (
        <MyProfileModal
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      )}
    </nav>
  );
};

export default Navbar;
