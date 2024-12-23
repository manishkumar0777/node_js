const http = require("http"); // built in module 
const fs = require("fs"); // built in module for filesystem


//creating a server and handling callback of the fuction create server with req and rec
const myServer = http.createServer((req, rec) => {
    //gettning user info
    const log = `${Date.now().toString()}: ${req.url} new request recieved\n`;

    //creatigng a file to store the data of the user request
    fs.appendFile("log.txt",log, (err, data)=> {
        // output on the server side
        rec.end("Hello server response sent");
    })
    
    
});

//running the server on the port
myServer.listen(8000, () => {console.log("Server Started")})