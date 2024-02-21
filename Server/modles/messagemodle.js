const mongoose = require('mongoose')

const MessageModle = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}
,{
    timestamps:true
}
)

const Message = mongoose.model("Message" ,MessageModle);
module.exports = Message;