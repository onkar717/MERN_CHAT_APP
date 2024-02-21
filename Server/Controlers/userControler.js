const asyncHandler = require("express-async-handler");
const User = require("../modles/usermodle");
const generatetoken = require("../DataBase/generatetoken");
// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')

// dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill the form" });
  }


  // const generatetoken = (id) => {
  //     return jwt.sign({id},process.env.JWT_SECRET_KET , {
  //         expiresIn:"365d"
  //     })
  // } // we can aslo use like this functon but we have created sprate files
  let userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({
    name,
    email,
    password,
    pic,
  });

  await user.save();

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token: generatetoken(user._id),
  });
});

const authuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
  
    if (user && (user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generatetoken(user._id),
      });
    } else {
      res.status(404).json({ Error: "Invalid credentials" });
    }
  })

  const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}; // If no search query is provided, set keyword to an empty object
    // const users = await User.find(keyword).find({_id : {$ne : req.user._id}});
    const users = await User.find(keyword);
    res.send(users);

});

  

module.exports = {registerUser , authuser , allUsers};
