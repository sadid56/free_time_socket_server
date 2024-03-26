const messageModel = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  console.log(chatId, senderId, text);
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = addMessage;
