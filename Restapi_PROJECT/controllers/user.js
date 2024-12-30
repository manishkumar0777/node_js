const User  = require("../models/user");

const handleGetalluser = async(req, res) => {
    const allDBuser = await User.find({});
    return res.json(allDBuser);
}

const handleGetUserById = async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){return rec.status(404).json({error : 'user not found'})};
    return res.json(user);
}

const handleUpdateUserById = async(req, res) => {
    await User.findByIdAndUpdate(req.params.id , {last_Name : 'chaned'});
    return res.json({status : 'success'});
}

const handleDeleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : 'success'});
}

const handleCreateUser = async(req, res) => {
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
    return rec.status(201).json({msg : 'success', id : result._id});
}


module.exports ={
    handleGetalluser,  
    handleGetUserById, 
    handleDeleteUserById, 
    handleUpdateUserById,
    handleCreateUser,
}