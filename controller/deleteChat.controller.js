const chatModel = require("../models/chatModel");

const DeleteChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        const result = await chatModel.deleteOne({ _id: chatId });
        res.status(200).json({ message: "Chat deleted successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = DeleteChat;
