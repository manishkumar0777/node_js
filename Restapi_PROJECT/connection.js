const mongoose = require("mongoose"); // MongoDB

async function connectMongoDB (url) {
    return mongoose.connect(url);
}

module.exports ={
    connectMongoDB,
}