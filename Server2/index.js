const http = require("http"); // built in module 
const fs = require("fs"); // built in module for filesystem
const url = require("url"); // importing url for parsing the reqUrl(npm i url)


//creating a server and handling callback of the fuction create server with req and rec
const myServer = http.createServer((req, rec) => {
    //gettning user info
    const log = `${Date.now().toString()}: ${req.url} new request recieved\n`;

    //parsing the the reqUrl
    const myUrl = url.parse(req.url, true); //true is passed here for the query parameters 
    console.log(myUrl);
    
    if(req.url === '/favicon.ico') return rec.end();
    //creatigng a file to store the data of the user request
    fs.appendFile("log.txt",log, (err, data)=> {
        // output on the server side
        switch(myUrl.pathname){
            case "/":
                rec.end("HOmePage");
                break;
            case "/about":
                const userName = myUrl.query.name; // getting the requested name in the query
                rec.end(`Hi ${userName}`); //sending the requested name
                break;
            default:
                rec.end("404");
            
        }
    })
    
    
});

//running the server on the port
myServer.listen(8001, () => {console.log("Server Started")})