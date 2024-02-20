
import jwt from 'jsonwebtoken'
async function getProfile(req,res,next){
    const {token}=req.cookies
    console.log(token);
    if(!token){
      res.status(200).json({
        success:false,
        message:"unaauthenticated, kindly Login again"
    })
  }
     try {
      const userDetails=jwt.decode(token,'a4d4df5dsd5sf',{algorithms:['HS512']})
      req.user=userDetails
      res.status(200).json({
          success:true,
          message:userDetails
      })
     } catch (error) {
      return res.status(401).json({
        success:false,
        message:"Kindly try again"
    })
     }      
      }
  