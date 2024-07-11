const mongoose = require("mongoose");
const messageschema = mongoose.Schema({
  content: String,
  room: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Message = mongoose.model("Message", messageschema);
module.exports = Message;
