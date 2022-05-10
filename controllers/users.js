const userModel = require('../models/user')
const bcrypt=require('bcryptjs')
const getUsers =async (req,res) => {
    const users= await userModel.find({ },  {_id:0, __v:0, hash:0})
   
    res.json({data: users})
    }

  const createUser =async (req,res) => {
    const {username,password}=req.body;
    if (!username || !password) {
        return res.status(500).json({msg:'login not provided'})    
    }
    try {
        const salt=await bcrypt.genSalt(6)
        const hash= await bcrypt.hash(password, salt)
        const newdbuser= { username,hash}
        const newUser=await userModel.create(newdbuser)
        res.status(201).json({msg:'user created'})
    }catch(err){
     res.status(500).json({msg:'validation error'})
    }
    
}
const deleteUser =async (req,res) => {
    const username= req.params.user;
    try {
    const user=await userModel.findOneAndDelete({ username:username}) 
    if(!user) {
        return res.status(500).json({msg: 'no such user'})
    }
    res.status(200).json({msg: `username  ${username}  was deleted`})
}catch(err) {
    res.status(500).json({msg: 'request failed'})
}
    
}
module.exports= { getUsers,
deleteUser,
createUser
}