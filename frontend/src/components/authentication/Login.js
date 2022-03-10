import "./form.css";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chat } from "../../context/ChatProvider";

const Login = () => {
  const { setUser } = useContext(Chat);
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.errors) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data._id) {
        history.push("/chats");
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log("Error creating user");
      setUser({});
      setLoading(false);
      return;
    }
  };

  return (
    <form className="form">
      <div className="form-content">
        {/* Email input */}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span className="input-error">{emailError}</span>
        </div>
        {/* Password input */}
        <div className="input-container pw-input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="show-pw" onClick={() => setShowPw(!showPw)}>
            {showPw ? "Hide" : "Show"}
          </p>
          <span className="input-error">{passwordError}</span>
        </div>
        {!loading && (
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Log In
          </button>
        )}
        {loading && (
          <button className="submit-btn" onClick={handleSubmit}>
            Logging In...
          </button>
        )}
        <button
          type="button"
          className="submit-btn guest-btn"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest Credentials
        </button>
      </div>
    </form>
  );
};

export default Login;
