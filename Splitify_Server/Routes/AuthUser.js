const express = require('express');
const {RegisterUser,userLogin} = require("../Controllers/AuthUsers");
const router = express.Router()

router.post('/register',RegisterUser);
router.post("/login",userLogin)

module.exports = router ; 