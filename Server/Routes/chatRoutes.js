const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removefromGroup} = require("../Controlers/chatControler");
const router = express.Router();
 
router.post('/', protect , accessChat)
router.get('/', protect , fetchChats)
router.post('/group' , protect , createGroupChat);
router.put('/rename' , protect , renameGroup);
router.put('/groupremove' ,protect , removefromGroup)
router.put('/groupadd' ,protect , addToGroup)


module.exports = router;