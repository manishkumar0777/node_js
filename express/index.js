// const http = require('http'); // not need of this also when going with the express
const express = require('express'); // importing express for better handling 

//initializing express
const app = express();

//handling the url // used as : app.METHOD(PATH , HANDLER); 
app.get('/' , (req, res) => {
    res.send("Hello From HomePage");
})

app.get('/about' , (req, res) => {
    res.send("Hello From About Page"+ "hey!" + req.query.name); // I am using uery here without importing the url module bcz it builtin in the express module 
})


//even we can remote this and totally go on the express******************
// const myServer = http.createServer(app);

// //staring the server on the Port
// myServer.listen(8000, () => {console.log("Server started")})

app.listen(8000, ()=> {console.log("server started")}); 


// in verson of the express you see the ^4.18.2 
// in this symbol ^ tells that range is between 4.18.2 -> 5.00.0