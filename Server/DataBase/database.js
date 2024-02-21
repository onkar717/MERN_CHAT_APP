const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors')

dotenv.config();

const DB = process.env.DATABASE;

    mongoose.connect(DB, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
    }).then(() => {
        console.log("Connection successful".yellow.bold);
    }).catch((error) => console.log("Connection error:", error.message));
    
