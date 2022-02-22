import "./Homepage.css";
import { useState } from "react";
import Signup from "../../components/authentication/Signup";
import Login from "../../components/authentication/Login";

const Homepage = () => {
  const [loginActive, setLoginActive] = useState(true);
  return (
    <section className="home">
      <div className="login-form">
        <h1 className="login-title">{loginActive ? "Login" : "Sign Up"}</h1>
        <div className="login-tabs">
          <p
            className={loginActive ? "active-tab" : ""}
            onClick={() => setLoginActive(true)}
          >
            Login
          </p>
          <p
            className={loginActive ? "" : "active-tab"}
            onClick={() => setLoginActive(false)}
          >
            Sign Up
          </p>
        </div>
        {loginActive && <Login />}
        {!loginActive && <Signup />}
      </div>
    </section>
  );
};

export default Homepage;
