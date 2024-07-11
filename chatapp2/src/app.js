const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);

app.use(express.static("../public"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
  socket.on("JoinRoom", ({ room }) => {
    socket.join(room);
    console.log("user joined the room");
  });
  socket.on("chatMessage", async ({ msg, room }) => {
    const message = new Message({ content: msg, room: room });
    await message.save();
    io.to(room).emit("message", { msg });
  });
});

module.exports = server;
