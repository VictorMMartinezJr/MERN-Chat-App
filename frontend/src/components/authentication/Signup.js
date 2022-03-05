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
  const [confirm, setConfirm] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const postDetails = (avatar) => {
    setLoading(true);
    if (avatar === undefined) {
      console.log("Please select an image");
      return;
    }

    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
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
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    } else {
      console.log("Not a valid image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser;
    if (avatar) newUser = { name, email, password, avatar };
    if (!avatar) newUser = { name, email, password };

    setLoading(true);
    if (password && !confirm) {
      console.log("Please confirm password");
      setLoading(false);
      return;
    }
    if (password && password !== confirm) {
      console.log("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar }),
      });

      const data = await res.json();

      if (data.errors) {
        setNameError(data.errors.name);
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
            onChange={(e) => setConfirm(e.target.value)}
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
          <label htmlFor="avatar">Upload Picture</label>
          <input
            name="avatar"
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
