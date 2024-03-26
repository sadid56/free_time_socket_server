const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const newChat = new chatModel({
    members: [req.body?.senderId, req.body?.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conversation with user

module.exports = createChat;

