import "./form.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const postDetails = () => {};
  const handleSubmit = () => {};

  return (
    <form className="form">
      <div className="form-content">
        {/* Name input */}
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Email input */}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="show-pw" onClick={() => setShowPw(!showPw)}>
            {showPw ? "Hide" : "Show"}
          </p>
        </div>
        {/* Confirm password input */}
        <div className="input-container confirm-input">
          <label htmlFor="confirmpw">Confirm Password</label>
          <input
            name="confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Your Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p
            className="show-confirm"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "Hide" : "Show"}
          </p>
        </div>
        {/* Upload avatar input */}
        <div className="input-container">
          <label htmlFor="pic">Upload Picture</label>
          <input
            name="pic"
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
        {!loading && (
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        )}
        {loading && (
          <button className="submit-btn" onClick={handleSubmit}>
            Signing Up...
          </button>
        )}
      </div>
    </form>
  );
};

export default Signup;
