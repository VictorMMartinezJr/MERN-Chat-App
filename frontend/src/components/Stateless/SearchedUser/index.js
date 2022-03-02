import { useHistory } from "react-router-dom";
import "./SearchedUser.css";

const SearchedUser = ({ user }) => {
  // Capitalize first letter in user info
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="searched-user">
      <img src={user.avatar} alt="user-avatar" className="searched-user-img" />
      <div className="searched-user-info">
        <p className="searched-user-name">{toUpperCase(user.name)}</p>
        <p className="searched-user-email">{toUpperCase(user.email)}</p>
      </div>
    </div>
  );
};

export default SearchedUser;
