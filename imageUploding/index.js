const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 8000;

//uploading 
// const upload = multer({dest : 'upload/'}) - makes no sense
const storage = multer.diskStorage({
    destination : function (req , file , cb){
        return cb(null, "./uploads");
    },
    filename : function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }

})

const upload = multer({storage : storage});

//view engine
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes
app.get("/", (req , res) => {
    res.render('home');
})

app.post("/upload", upload.single("profileImage"), (req , res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
})



app.listen(PORT, ()=> {console.log("server started")});