const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
async function registerUser(req,res){

    const {username,email,password,role='user'} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({message : "User already exist"})
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password : hash,
        role
    })

    const token = jwt.sign({
        id:user._id,
        role : user.role
    },process.env.JWT_SECRETS)

    res.cookie("token",token)

    return res.status(201).json({
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        },
        message : "User registered succefully"
    })
}

async function loginUser(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or :[
            {username},
            {email}
        ]
    })
    
    if (!user) {
    return res.status(401).json({
        message: "Invalid username or email"
    })
}

const isPasswordCorrect = await bcrypt.compare(password, user.password)

if (!isPasswordCorrect) {
    return res.status(401).json({
        message: "Invalid password"
    })
}

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRETS)

    res.cookie("token",token)

    return res.status(201).json({
        message : "User Logged In successfully",
        user : {
            id:user._id,
            username : user.username,
            role : user.role,
            email : user.email
        }
    })

}

module.exports = {registerUser,loginUser}