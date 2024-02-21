const asyncHandler = require('express-async-handler')
const Chat = require('../modles/chatmodles'); // Ensure the path is correct
const User = require('../modles/usermodle'); // Ensure the path is correct

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("Userid param not sent with request");
        return res.status(400).send({ message: "User ID not sent with request" });
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}}, // Assuming req.user._id is set by your auth middleware
            {users: {$elemMatch: {$eq: userId}}},
        ]
    }).populate('users',"-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatname: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId], // Assuming req.user._id is set correctly
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate('users',"-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400).json({ message: 'Error Occurs', error: error.toString() });
            console.log("Error is : " , error);
        }
    }
});

const fetchChats = asyncHandler(async (req,res) => {
    try {
        Chat.find({users: { $elemMatch: {$eq: req.user._id}}})
        .populate("users" , "-password")
        .populate("groupAdmin" , "-password")
        .populate("latestMessage")
        .sort({updatedAt : -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: 'latestMessage.sender',
                select: 'name pic email'
            });
            res.status(200).send(results);
        })
    } catch (error) {
        
    }
})

const createGroupChat = asyncHandler(async (req , res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({message :"Please Fill the fileds "})
    }

    var users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.status(400).send("More than 2 are required to form a group chat")
    }

    users.push(req.user);
    try {groupChat = await Chat.create({
        chatname: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
    })

    const FullGroupchat = await Chat.findOne({_id: groupChat._id})
    .populate("users" , "-password")
    .populate("groupAdmin", "-password")
    res.status(200).json(FullGroupchat);
    } catch (error) {
        console.log("error is " , error);
        res.status(400).json({Error:"Errror Occur"})
    }
})

const renameGroup = asyncHandler(async (req,res) => {
    const {chatId , chatname} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatname,
        },
        {
            new: true,
        }
    )
    .populate("users" , "-password")
    .populate("groupAdmin" , "-password")

    if (!updatedChat) {
        res.status(400).json({Error:"Error ahe update chat made "})
    }
    else{
        res.json(updatedChat)
    }

})

const addToGroup = asyncHandler(async (req,res) => {
    const {chatId , userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {users: userId},
        },
        {new : true}
    )
    .populate("users" , "-password")
    .populate("groupAdmin" , "-password")

    if (!added) {
        res.status(404)
        .json({Error:"Erroor Occur during add to Group"})
    }
    else{
        res.json(added);
    }

})

const removefromGroup = asyncHandler(async (req,res) => {
    const {chatId , userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {users: userId},
        },
        {new : true}
    )
    .populate("users" , "-password")
    .populate("groupAdmin" , "-password")

    if (!added) {
        res.status(404)
        .json({Error:"Erroor Occur during add to Group"})
    }
    else{
        res.json(added);
    }

})

module.exports = {accessChat , fetchChats , createGroupChat , renameGroup , addToGroup , removefromGroup};