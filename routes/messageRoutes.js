const addMessage = require("../controller/addMessage.controller");
const getMessages = require("../controller/getMessage.controller");

const router = require("express").Router()


// messages
router.post("/message", addMessage)
router.get("/message/:chatId", getMessages)

module.exports = router;