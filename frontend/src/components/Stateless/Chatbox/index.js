import "./Chatbox.css";
import { useContext } from "react";
import SingleChat from "../SingleChat";
import { Chat } from "../../../context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, iPadSearch } = useContext(Chat);
  const iPadScreen = window.matchMedia("(max-width: 1024px)"); // For conditional rendering on smaller screens

  return (
    <>
      {!iPadScreen.matches ? (
        <section className="chatbox">
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </section>
      ) : (
        <section
          className={selectedChat && !iPadSearch ? "chatbox" : "chatbox-ipad"}
        >
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </section>
      )}
    </>
  );
};

export default Chatbox;
