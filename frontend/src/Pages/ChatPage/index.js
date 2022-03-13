import "./ChatPage.css";
import { useContext, useState } from "react";
import Navbar from "../../components/Stateless/Navbar";
import Chatbox from "../../components/Stateless/Chatbox";
import SearchRight from "../../components/Stateless/SearchRight";
import Chats from "../../components/Stateless/Chats";
import { Chat } from "../../context/ChatProvider";

const Chatpage = () => {
  const { user } = useContext(Chat);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <section className="chat-page">
      <Navbar />
      <div className="chat-content">
        {user && (
          <Chats setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
        )}
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        <SearchRight />
      </div>
    </section>
  );
};

export default Chatpage;
