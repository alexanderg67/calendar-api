//  auth middleware for Event router.Any user with valid token can access
const jwt=require('jsonwebtoken')
const authUser = async (req,res,next) => {
    const headerAuth= req.headers.authorization;
    if (!headerAuth || !headerAuth.startsWith('Bearer ')){
        return  res.status(401).json({msg: 'Wrong token'})
    }
    const inputToken=headerAuth.split(' ')[1]
    try {
    const decoded= jwt.verify(inputToken,process.env.JWT_SECRET)
    req.username=decoded.name;
    next()
    }catch(err) {
    return  res.status(401).json({msg: 'Wrong token'})    
    }
}

module.exports=authUser;