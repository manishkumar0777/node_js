
const mongoose = require('mongoose');


//schema
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

const User  = mongoose.model( "user", userSchema);

module.exports = User;