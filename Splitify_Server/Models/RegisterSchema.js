const mongoose = require('mongoose');
const Registerschema = new mongoose.Schema({
    userName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model("userRegister",Registerschema)