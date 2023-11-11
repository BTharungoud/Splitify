const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const SplitPDF = require('./Routes/SplitPDF')
const AuthUser = require('./Routes/AuthUser')
require('dotenv').config();

const app = express();
//.env variables
const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

//middlewares
app.use(express.json())
app.use(cors());
//routes
app.use("/splitPDF",SplitPDF)
app.use("/auth",AuthUser)
app.get("/",(req,res)=>{
    res.send("Server started sucessfully and Listening.")
})


// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})
app.listen(PORT,()=>{
    console.log(`Server started sucessfully at ${PORT}`)
    mongoose.connect(MONGO).then(()=>{
         console.log("Connected to mongoDB")
    }).catch((err)=>{
        console.log(`here is the error in the code ${err}`)
    })
})
