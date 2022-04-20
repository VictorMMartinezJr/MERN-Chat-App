import "./MyProfileModal.css";
import { useContext } from "react";
import { Chat } from "../../../../context/ChatProvider";
import { AiFillCloseCircle } from "react-icons/ai";

const MyProfileModal = ({ openProfile, setOpenProfile }) => {
  const { user } = useContext(Chat);

  return (
    <div
      className={
        openProfile
          ? "myprofile-modal-container modal-active"
          : "myprofile-modal-container"
      }
    >
      <div className="myprofile-modal">
        <AiFillCloseCircle
          className="close-modal-btn"
          onClick={() => setOpenProfile(false)}
        />
        <div className="myprofile-modal-header">
          <h2 className="myprofile-modal-name">{user.name}</h2>
          <p className="myprofile-modal-email">{user.email}</p>
        </div>
        <img
          className="myprofile-modal-img"
          src={user.avatar}
          alt="user-avatar"
        />
      </div>
    </div>
  );
};

export default MyProfileModal;
