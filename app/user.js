import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import AuthRouter from '../Routers/AuthRouter.js'
import courseRoutes from '../Routers/courseRoutes.js'
import paymentsRoutes from '../Routers/paymentsRoutes.js'
import bodyParser from 'body-parser'
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay'

dotenv.config()
const PORT=process.env.PORT || 5002
const app=express()
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended:true}))
app.use(cookieparser())
    app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
     }))
  app.get('/ping',(_req,res)=>{
    res.send('Pong')
  })
  cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET,
    // secure:true
  });

  export const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET_ID,
    secure:true
  });
app.use('/api/v1/user',AuthRouter)
app.use('/api/v1/courses',courseRoutes)
app.use('/api/v1/payments',paymentsRoutes)
    app.listen(PORT,()=>{
      console.log(`Server is running on ${PORT}`)
    })
