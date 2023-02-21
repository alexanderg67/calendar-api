const userModel = require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt= require('bcryptjs');
// Handle login page request
const login =async (req,res) => {
   let {login,password}=req.body;
   if(!login  || !password ){
     return  res.status(401).json({msg: 'Wrong login or password'})
     }
     let user
     try {
     user=await userModel.findOne({username: login})
    
    }catch(err) {
      res.status(500).json({msg: 'db request failed'})
      }  
     if (user) {
      const compareResult= await bcrypt.compare(password, user.hash);
      if(compareResult) {
        //create and return token for user
        const token= jwt.sign( { name:user.username} ,process.env.JWT_SECRET , {expiresIn: '8h' })
       
      res.status(200).json(token) // return token which will be set to browser localStorage
      }else{
        return  res.status(401).json({msg: 'Wrong login or password'})
      }
         
       
     }else{
      if(login==='superadmin') { //  If typed superadmin login  and this user not exist we will create superadmin with password from form
       
      const salt=await bcrypt.genSalt(6)
      const hash= await bcrypt.hash(password, salt)
      let newdbuser= { username: 'superadmin',hash}
      await userModel.create(newdbuser)
      return  res.status(401).json({msg: 'Created superadmin. Try login again'})
      }
      return  res.status(401).json({msg: 'Wrong login or password'})
     }
}
module.exports = {login}