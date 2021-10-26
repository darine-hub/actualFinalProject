const express = require("express");
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware')
const {getAllChatrooms,getRoomChat,addchatmessage,getmessages,getallmessages,addRoom,addmessage} = require('../Controllers/chatController')



router.get("/getAllChatrooms/:id",authMiddleware, getAllChatrooms)
router.post("/addRoom",authMiddleware,addRoom);
router.post("/addmessage",authMiddleware,addmessage);
router.get("/getmessages/:user1/:user2",authMiddleware,getmessages);
router.get("/getallmessages/:id",authMiddleware,getallmessages);
router.get("/getRoomChat/:id",authMiddleware, getRoomChat)
router.post("/addchatmessage",authMiddleware,addchatmessage);

module.exports = router;