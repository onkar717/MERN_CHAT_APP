const express = require('express');
const dotenv = require('dotenv')
const {chats} = require('./data/data');
const route = require('./Routes/route');
const chatRoutes = require('./Routes/chatRoutes')
const { notFound , errorHandler } = require('./middleware/errorMiddleware');

// require('./Routes/route')

dotenv.config();

// to add the connection
require('./DataBase/database')
const app = express();

// to accpet the json data 
app.use(express.json()); // to accept json data


app.get('/' , (req,res) => {
    res.send("Api is Runng");
})

// To navigate all routes here  
app.use('/api/user', route)
app.use('/api/chats' , chatRoutes)


// created api from the direct app.js file
app.get('/api/chat' , (req,res) => {
    res.send(chats);
})


// // to find the data by id 
// app.get('/api/chat/:id' , (req,res) => {
//     const singlechat = chats.find((c) => c._id === req.params.id)
//     res.send(singlechat);
// })

// to handle the error and notfound page 

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`Server is Started on ${PORT}`.yellow.bold);
})