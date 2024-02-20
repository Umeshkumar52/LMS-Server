import jwt from "jsonwebtoken";
const authorisedRole=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        const userDetails=await jwt.decode(token,process.env.JWT_SECRET_KEY) 
      console.log("role",userDetails.role);
        if(userDetails.role !='ADMIN'){
            return res.status(403).json({
                success:false,
                message:"you can`t access admin routes"
            })
        }
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"! SORRY, please try again"
        })
    }
next()
}
export default authorisedRole;