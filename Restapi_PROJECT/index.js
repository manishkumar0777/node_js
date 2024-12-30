const express = require("express"); //express 
const fs = require("fs"); // for the file system
const mongoose = require("mongoose"); // MongoDB

const userRouter = require("./routes/user") // router
const {connectMongoDB}= require("./connection") //Mongodb connnection
const {logReqRes} = require("./middleware/index"); //middleware
const { error } = require("console");

const app = express(); // creating express app named server
const PORT = 8000; 

//Middleware
app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));

//Connect
connectMongoDB("mongodb://127.0.0.1:27017/practice-01")
.then(() => {console.log("MongoDb Connected")})

//Router
app.use("/api/user", userRouter);
 
app.listen(PORT, ()=> {console.log(`server started at PORT ${PORT}`)}); //starting server on PORT