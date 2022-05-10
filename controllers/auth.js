const userModel = require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt= require('bcryptjs');
// Handle login page request
const login =async (req,res) => {
   let {login,password}=req.body;
   if(!login  || !password ){
     return  res.status(401).json({msg: 'Wrong login or password'})
     }
     const user=await userModel.findOne({username: login})
     if (user) {
      const compareResult= await bcrypt.compare(password, user.hash);
      if(compareResult) {
        //create and return token for user
        const token= jwt.sign( { name:user.username} ,process.env.JWT_SECRET , {expiresIn: '8h' })
       
      res.status(200).json(token)
      }else{
        return  res.status(401).json({msg: 'Wrong login or password'})
      }
         
       
     }else{
      return  res.status(401).json({msg: 'Wrong login or password'})
     }
}
module.exports = {login}