const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usermodle = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
}
,{
    timestamps:true
}
)

usermodle.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

// before saving just bcrypt the password 
usermodle.pre('save', async function(next) {
    if (!this.isModified('password')) {
        // Only hash the password if it has been modified (or is new)
        next();
    }
    try {
        if (typeof this.password !== 'string') {
            throw new Error('Password must be a string');
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
const User = mongoose.model("User" , usermodle)
module.exports = User;