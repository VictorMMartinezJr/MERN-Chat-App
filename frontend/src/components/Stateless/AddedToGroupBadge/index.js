import "./AddedToGroupBadge.css";
import { AiFillCloseCircle } from "react-icons/ai";

const AddedToGroupBadge = ({ selectedUser, handleDelete }) => {
  return (
    <div className="user-badge">
      <p>{selectedUser.name}</p>
      <AiFillCloseCircle className="remove-user-btn" onClick={handleDelete} />
    </div>
  );
};

export default AddedToGroupBadge;
