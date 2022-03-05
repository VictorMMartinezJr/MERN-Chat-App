import "./ChatPage.css";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Stateless/Navbar";
import MyChats from "../../components/Stateless/Chats";
import ChatBox from "../../components/Stateless/ChatBox";
import SearchRight from "../../components/Stateless/SearchRight";
import Chats from "../../components/Stateless/Chats";
import { Chat } from "../../context/ChatProvider";

const Chatpage = () => {
  const { user } = useContext(Chat);

  return (
    <section className="chat-page">
      <Navbar />
      <div className="chat-content">
        {user && <Chats />}
        <ChatBox />
        <SearchRight />
      </div>
    </section>
  );
};

export default Chatpage;
