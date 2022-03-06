import "./Chatbox.css";
import { useContext } from "react";
import { Chat } from "../../../context/ChatProvider";
import SingleChat from "../SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { SelectedChat } = useContext(Chat);
  return (
    <section className="chatbox">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </section>
  );
};

export default Chatbox;
