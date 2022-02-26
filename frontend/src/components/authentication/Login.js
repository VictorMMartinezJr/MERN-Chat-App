import "./form.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userLogin = { email, password };
    if (!email || !password) {
      console.log("Please enter all fields");
      setLoading(false);
      return;
    }

    try {
      fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin),
      }).then(console.log("Successful Login!"));

      localStorage.setItem("userInfo", JSON.stringify(userLogin));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.log(error.data.message);
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
              console.log(email);
            }}
          />
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
