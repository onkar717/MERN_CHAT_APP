const express = require('express');
const router = express.Router();
const { registerUser, authuser, allUsers } = require('../Controlers/userControler');
const {protect} = require("../middleware/authMiddleware");

router.get('/about', (req, res) => {
    res.send("Hello From Router About");
});

router.post('/', registerUser);

router.post('/login', authuser);

// Protect middleware applied to the route
router.get('/', protect , allUsers);


module.exports = router;
