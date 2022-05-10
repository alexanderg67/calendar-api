//  auth middleware for User router. superser with   token can access
const jwt=require('jsonwebtoken')
const authUser = async (req,res,next) => {
    const headerAuth= req.headers.authorization;
    if (!headerAuth || !headerAuth.startsWith('Bearer ')){
        
        return  res.status(401).json({msg: 'Wrong token'})
    }
    const inputToken=headerAuth.split(' ')[1]
    try {
    const decoded= jwt.verify(inputToken,process.env.JWT_SECRET)
    if (decoded.name!='superadmin') {
    return  res.status(401).json({msg: 'No access'})    
    }
    req.username=decoded.name;
    next()
    }catch(err) {
    return  res.status(401).json({msg: 'Wrong token'})    
    }
}

module.exports=authUser;