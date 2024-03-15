import jwt from 'jsonwebtoken'
import cookies from 'cookie-parser'
const isLogined=async(req,res,next)=>{
    const token=req.cookies.token
    
    if(!token){
       return res.status(401).json({
          success:false,
          message:"!OPPS, unauthenticated, kindly Login again"
      })
    }
    const userDetails=await jwt.decode(token,process.env.JWT_SECRET_KEY)
    if(!userDetails){
        return res.status(401).json({
           success:false,
           message:"!OPPS, unauthenticated"
       })
     }
    req.user=userDetails;
    next()
}
export default isLogined; 