import "./form.css";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chat } from "../../context/ChatProvider";

const Login = () => {
  const { setUser } = useContext(Chat);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [topInputActive, setTopInputActive] = useState(false);
  const [bottomInputActive, setBottomInputActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fetch User
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      // Check for any errors and display them
      if (data.errors) {
        setLoading(false);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);
      // Push user to chats page if successful login
      if (data._id) {
        history.push("/chats");
      }
    } catch (err) {
      setEmailError("Error creating user");
      setUser({});
      setLoading(false);
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
            onFocus={() => {
              setEmailError(""); // Clear error
              setTopInputActive(true); // Set highlighted bottom border
            }}
            onBlur={() => setTopInputActive(false)} // Remove highlighted bottom border
            className={
              topInputActive ? "form-input active-input" : "form-input"
            }
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
            onFocus={() => {
              setPasswordError(""); // Clear error
              setBottomInputActive(true); // Set highlighted bottom border
            }}
            onBlur={() => setBottomInputActive(false)} // Remove highlighted bottom border
            className={
              bottomInputActive ? "form-input active-input" : "form-input"
            }
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
        {/* Buttons for easy login */}
        <button
          type="button"
          className="submit-btn guest-btn"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("guest123456");
          }}
        >
          Get Guest Credentials
        </button>
        <button
          type="button"
          className="submit-btn guest-btn"
          onClick={() => {
            setEmail("guest2@example.com");
            setPassword("guestTwo123456");
          }}
        >
          Get 2nd Guest Credentials
        </button>
      </div>
    </form>
  );
};

export default Login;
