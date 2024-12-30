const express = require("express"); //express 
const fs = require("fs"); // for the file system
const mongoose = require("mongoose"); // MongoDB

//getting data 
// let users = require("./MOCK_DATA.json");//using database now so thats why removing this

const app = express(); // creating express app named server
const PORT = 8000;

//using middleware for the data from the user : DECODING
app.use(express.urlencoded({extended : false}));

//next middle ware -- these are used for security purpose or validation or data collection
// app.use((req, res, next) => {
//     console.log('Hello from middle ware ');
//     next(); // if this next is not called then req will stuck here
// })

//connecting mongoDb

mongoose.connect('mongodb://127.0.0.1:27017/practice-01')
.then(()=> console.log("MongoDB Connected"))
.catch((err) = console.log('Mongo Error : '))

//Schema MongoDB-

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
    }, 
    last_Name : {
        type: String,
        required : false
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    JObTitle : {
        type : String
    },
    gender : {
        type : String
    }
}, {timeStamp: true});

//MOdel 

const User  = mongoose.model( "user", userSchema)

//routes*********************************

//rendering using ssr
app.get("/users" , async (req, res) => {
    const DBusers = await User.find({});
    const html = 
    `  
    <ul>
    ${DBusers.map((users) => `<li>${users.first_name} ${users.email}</li>`).join("")}
    </ul>
    `
    return res.send(html);
});

// REST API :: json rendering for hybrid server type (both mobile app and web) 
app.get('/api/users' , async (req, res) => {
    const DBusers = await User.find({});
    res.setHeader('X-myName',"Manish"); //adding x to show that its a custom header
    return res.json(DBusers);
});

//(for patch and delete) getting user with the ID and updating or deleting (same route thats the reason created at one place)
app.route("/api/users/:id")
.get( async (req, rec) => {

    //new
    const user = await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user)=> user.id === id);
    if(!user){return rec.status(404).json({error : 'user not found'})};
    rec.json(user);
})
.patch( async (req, rec) => {

    await User.findByIdAndUpdate(req.params.id , {last_Name : 'chaned'}); //with the help of mongo
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
.delete(async (req, rec) => {

    await User.findByIdAndDelete(req.params.id); 
    return rec.json({msg : 'user deleted'})
    
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
app.post('/api/users', async (req, rec)=>{
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender 
    ) {
        return rec.status(404).json({msg : " All fields are required"});
    }
    //using mongo db to create the user 
    const result = await User.create({
        first_name : body.first_name,
        last_Name : body.last_name,
        email : body.email,
        JObTitle : body.job_title,
        gender : body.gender
    });
    console.log( 'user' , result)
    return rec.status(201).json({msg : 'success'});
     
    //getting user and pushing in the user data file
    // users.push({...body, id : users.length +1})
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users) , (err, data) => {
    //     try {
    //         return rec.json("user created");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
    console.log("Body", body);
    
})
 
app.listen(PORT, ()=> {console.log(`server started at PORT ${PORT}`)}); //starting server on PORT