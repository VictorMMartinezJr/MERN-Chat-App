const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

dotenv.config();
connectToDB();
const app = express();

// Accept json data
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ------------- Deployment ------------- //

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running!!");
  });
}

// ------------- Deployment ------------- //

app.get("/", (req, res) => {
  res.send("API is running!!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));
