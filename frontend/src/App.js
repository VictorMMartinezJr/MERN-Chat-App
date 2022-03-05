import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import Chatpage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/chats">
          <Chatpage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
