import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ChatContext from "./context/ChatProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChatContext>
        <App />
      </ChatContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
