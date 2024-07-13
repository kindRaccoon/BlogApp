const express = require('express');
const { getAllUsers, registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

//Get All Users
router.get("/all", getAllUsers)

//Register
router.post("/register", registerUser)

//Login
router.post("/login", loginUser);

module.exports = router;