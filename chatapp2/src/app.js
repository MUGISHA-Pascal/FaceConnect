const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);
const Message = require("./modules/message");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chatapp2");
const chatroutes = require("./routes/chat");

app.use(express.static("public"));
app.use("/chat", chatroutes);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log("user joined the room");
  });
  socket.on("chatMessage", async ({ msg, room }) => {
    const message = new Message({ content: msg, room: room });
    await message.save();
    io.to(room).emit("message", { msg });
    console.log(`Message emitted: ${msg} to room: ${room}`);
  });
});

module.exports = server;
