const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("app runnning on http://localhost:3000");
});
