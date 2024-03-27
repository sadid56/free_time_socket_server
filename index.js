const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.MONGODB_CONNECTION;

// Connect to MongoDB
mongoose.connect(CONNECTION)
  .then(() => console.log(`Free time socket.io server connected`))
  .catch((error) => console.log(`${error} did not connect`));

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io with the server
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "https://free-time-56230.web.app"],
  }
});

let users = [];

const addUser = (userId, socketId) => {
  if (userId !== null) { !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  } else {
    console.error("Invalid userId:", userId);
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected!");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.emit("connection-status", "a user connected.");

  // add user
  socket.on("addUsers", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    if (!receiverId) {
      socket.emit("errorMessage", "User not found. Please try again later.");
      return;
    }

    // get message
    try {
      socket.in(receiverId).emit("getMessage", { senderId, receiverId, text });
    } catch (error) {
      socket.emit("errorMessage", "Failed to send message. Please try again later.");
    }
  });

  // user disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
    // Handle socket errors
  });
});

app.get("/", (req, res)=>{
  console.log("socket server...");
  res.send("Runing...")
})

// Start server
server.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`);
});

// Register routes
app.use(chatRoutes);
app.use(messageRoutes);
