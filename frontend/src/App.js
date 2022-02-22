import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Home/Homepage";
import Chatpage from "./Pages/Chatpage";

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
