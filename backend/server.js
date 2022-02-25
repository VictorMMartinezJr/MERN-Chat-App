const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectToDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectToDB();
const app = express();

// Accept json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on PORT ${PORT}`.yellow.bold));
