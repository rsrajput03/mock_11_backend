const express = require('express');
const mongoose = require('mongoose');
const { bookRouter } = require('./routes/book.routes');
const { userRouter } = require('./routes/user.routes');
require('dotenv').config()

const  app= express();
app.use(express.json());
app.use("/api",userRouter)
app.use("/api",bookRouter)

const connection = mongoose.connect(process.env.mongoURL)

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to MogoDB")
    } catch (error) {
        console.log("Not able to Connected to MogoDB")
        console.log(error)
    }
    console.log(`Server is running on port ${process.env.PORT}`)
})