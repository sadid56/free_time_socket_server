const express = require("express");
const createChat = require("../controller/chat.controller");
const userChat = require("../controller/userChat.controller");
const findChat = require("../controller/findChat.controller");
const DeleteChat = require("../controller/deleteChat.controller");
const router = express.Router();

// new conversation
router.post("/chat", createChat);
router.get("/chat/:userId", userChat);
router.get("/chat/find/:firstId/:secondId", findChat);
router.delete("/chat/:id", DeleteChat)

module.exports = router;
