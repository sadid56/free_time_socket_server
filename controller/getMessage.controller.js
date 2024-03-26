const messageModel = require("../models/messageModel");

// get messges
const getMessages = async (req, res) => {
    const {chatId} = req.params;
  try {
    const result = await messageModel.find({chatId});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = getMessages;
