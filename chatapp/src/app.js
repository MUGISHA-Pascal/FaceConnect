const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

mongoose.connect("mongodb://localhost:27017/chatapp");

app.use(express.static("public"));

const Message = require("./models/message");
const chatRouter = require("./routes/chat");
const { Socket } = require("socket.io");

app.use("/chat", chatRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`a user joined room: ${room}`);
  });
  socket.on("chatMessage", async ({ msg, room }) => {
    const message = new Message({ content: msg, room });
    await message.save();
    io.to(room).emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = http;
