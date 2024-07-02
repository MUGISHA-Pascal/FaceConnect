const express = require("express");
const http = require("http");
const app = express();
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static("public"));
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
server.listen(3000, () => {
  console.log("server running on port 3000");
});
