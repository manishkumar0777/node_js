const express = require("express");
const { 
    handleGetalluser, 
    handleGetUserById, 
    handleDeleteUserById , 
    handleUpdateUserById, 
    handleCreateUser,
} = require("../controllers/user"); //controller

const router = express.Router();

//handling the request
router.route('/')
.get( handleGetalluser)
.post(handleCreateUser);

router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

router.post('/',handleCreateUser);


module.exports = router;