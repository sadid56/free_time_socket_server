const chatModel = require("../models/chatModel");

const findChat = async (req, res) => {
 
    try {
      const chat = await chatModel.findOne({
        members: {$all:[req.params.firstId, req.params.secondId]}
      })
      res.status(200).json(chat)
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // get conversation with user
  
  module.exports = findChat;