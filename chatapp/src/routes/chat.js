const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/:room", async (req, res) => {
  const { room } = req.params;
  const messages = await Message.find({ room });
  res.send(messages);
});

module.exports = router;
