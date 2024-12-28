const express = require("express"); //express 
const fs = require("fs"); // for the file system

//getting data 
let users = require("./MOCK_DATA.json");

const app = express(); // creating express app named server
const PORT = 8000;

//using middleware for the data from the user : DECODING
app.use(express.urlencoded({extended : false}));


//routes*********************************

//rendering using ssr
app.get("/users" , (req, res) => {
    const html = 
    `  
    <ul>
    ${users.map(users => `<li>${users.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
});

// REST API :: json rendering for hybrid server type (both mobile app and web) 
app.get('/api/users' , (req, res) => {
    return res.json(users);
});

//(for patch and delete) getting user with the ID and updating or deleting (same route thats the reason created at one place)
app.route("/api/users/:id")
.get((req, rec) => {
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);

    rec.json(user);
})
.patch((req, rec) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);
    console.log(user, body);
    
    //updating the user in the users array
    users = users.map((user) => user.id === id ? {...user, ...body} : user);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=> {
        try {
            console.log(user);
            return rec.json("user updated");
            
        } catch (err) {
            console.log(err);
        }
    });
})
.delete((req, rec) => {
    const id = req.params.id;
    //filtering the users with id

    //updating the deleted user
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=> {
    //     try {
    //         return rec.json('deleted');
    //     } catch (err) {
    //         console.log("failed to delete the user",  err)
    //     }
    // })
    
});


//adding user using POST
app.post('/api/users', (req, rec)=>{
    
    const body = req.body;

    //getting user and pushing in the user data file
    users.push({...body, id : users.length +1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users) , (err, data) => {
        try {
            return rec.json("user created");
        } catch (err) {
            console.log(err);
        }
    });
    console.log("Body", body);
    
})
 
app.listen(PORT, ()=> {console.log(`server started at PORT ${PORT}`)}); //starting server on PORT