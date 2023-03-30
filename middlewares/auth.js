const jwt=require('jsonwebtoken')
const User=require('./../models/users')
exports.isUserAuthenticated=async (req,res,next)=>{
try{

    if(!req?.headers?.authorization?.startsWith('Bearer')){
        return res.status(403)
        .json({error:"Missing Authorization header with Bearer token"})
    }
    const token=req.headers.authorization.split(' ')[1]
    
    if(!token){
        res.status(401)
        .json({error:'Authentication Failed'})
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
    
    req.user=await User.findOne({_id:decoded.id})
    next()
}catch (error) {
    console.log(error);
    return res.status(500).json({
        error: "User authentication failed",
    });
}
}