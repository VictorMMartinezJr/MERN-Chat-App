import "./Navbar.css";
import { useContext, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Chat } from "../../../context/ChatProvider";

const Navbar = () => {
  const { user } = useContext(Chat);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const history = useHistory();

  const logUserOut = () => {
    localStorage.clear(); // Clear all keys and values in LS
    history.push("/");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Chit Chat</h1>
      <div className="right-nav">
        <BsFillBellFill className="bell-icon" />
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
            <p>My Profile</p>
            <p onClick={logUserOut}>Log out</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
