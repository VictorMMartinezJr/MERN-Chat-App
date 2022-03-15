import "./form.css";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chat } from "../../context/ChatProvider";

const Signup = () => {
  const { setUser } = useContext(Chat);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [confirm, setConfirm] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const postDetails = (avatar) => {
    setLoading(true);

    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      // Upload avatar to cloudinary
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("upload_preset", "chit-chat");
      formData.append("cloud_name", "victormtzcodes");

      fetch("https://api.cloudinary.com/v1_1/victormtzcodes/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setAvatarError(err.message);
          setLoading(false);
        });
    } else {
      setAvatarError("Not a valid image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Error if confirm password input is not filled only if password exists
    if (password && !confirm) {
      setConfirmError("Please confirm password");
      setLoading(false);
      return;
    }
    // Check if passwords match only if password exists
    if (password && password !== confirm) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Create User
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar }),
      });
      const data = await res.json();
      // Check if errors exists & display them
      if (data.errors) {
        setNameError(data.errors.name);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
        setAvatarError(data.errors.avatar);
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);

      // Push user to chat page if successful signup
      if (data._id) {
        history.push("/chats");
      }
    } catch (err) {
      setAvatarError("Error creating user");
      setLoading(false);
      return;
    }
  };

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
            className="form-input"
            onFocus={() => setNameError("")} // Clear error when user clicks on input again
            onChange={(e) => setName(e.target.value)}
          />
          <span className="input-error">{nameError}</span>
        </div>
        {/* Email input */}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter Your Email"
            required
            className="form-input"
            onFocus={() => setEmailError("")} // Clear error when user clicks on input again
            onChange={(e) => setEmail(e.target.value)}
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
            className="form-input"
            onFocus={() => setPasswordError("")} // Clear error when user clicks on input again
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="show-pw" onClick={() => setShowPw(!showPw)}>
            {showPw ? "Hide" : "Show"}
          </p>
          <span className="input-error">{passwordError}</span>
        </div>
        {/* Confirm password input */}
        <div className="input-container confirm-input">
          <label htmlFor="confirmpw">Confirm Password</label>
          <input
            name="confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Your Password"
            required
            className="form-input"
            onFocus={() => setConfirmError("")} // Clear error when user clicks on input again
            onChange={(e) => setConfirm(e.target.value)}
          />
          <p
            className="show-confirm"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "Hide" : "Show"}
          </p>
          <span className="input-error">{confirmError}</span>
        </div>
        {/* Upload avatar input */}
        <div className="input-container">
          <label htmlFor="avatar">Upload Picture</label>
          <input
            name="avatar"
            type="file"
            accept="image/*"
            required
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <span className="input-error">{avatarError}</span>
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
