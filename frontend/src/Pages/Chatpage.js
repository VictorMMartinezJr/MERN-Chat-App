import { useEffect, useState } from "react";

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = () => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => setChats(data));
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <h1 key={chat._id}>{chat.chatName}</h1>
      ))}
    </div>
  );
};

export default Chatpage;
