import Razorpay from "razorpay"
import Users from '../models/userSchema.js'
import Courses from '../models/courseModel.js'
import payment from "../models/paymentModel.js"
import {razorpayInstance} from '../app/user.js'
import crypto from 'crypto';
import { error, log } from "console";
const allPayments=async function(req,res,next){
   try {
    const option={
        from:'2024-01-01',
        to:'2024-02-02'
      }   
    //   if(option){ 
    // const allPayouts=await razorpayInstance.payments.all(option)
    //   }
      const allPayouts=await razorpayInstance.payments.all()
    return res.status(200).json({
         success:true,
         message:"Fetch all payments successfully",
         response:allPayouts
     })
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:" failed to Fetch payments",
    })
   }
}
const getrazorPayKey=async function(req,res,next){
     res.status(200).json({
        success:true,
        message:process.env.RAZORPAY_KEY_ID,
        key:process.env.RAZORPAY_KEY_ID
     })
}
const Buysubscription=async function(req,res,next){
    try {
        const {id}=req.params;
        const user=await Users.findById(id)
        if(!user){
           return res.status(400).json({
               success:false,
               message:"Not authorised please try again"
           })
        }
      const subscription=await razorpayInstance.subscriptions.create({
       plan_id:process.env.COURSE_PLANE_ID,
       total_count:5,
       quantity:2
      })
      const subscriptionId=subscription.id
      if(!subscription){
        return res.status(400).json({
            success:false,
            message:"! OPPS, Unable to create subscription"
        })
      }      
      user.subscription.id=subscription.id;
      // user.subscription.status=subscription.status;
      await user.save();
      res.status(200).json({
       success:true,
       message:"Subscription Successfully",
      subscription_id:subscriptionId
      })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"! OPPS, Unable to create subscription..."
        })
    }}
const verifySubscription=async function(req,res,next){
  try {
    console.log("verify calling");
     console.log("parmamss",req.params,req.body);
  const {_id}=req.user
 const {id}=req.params
  const { razorpay_payment_id,razorpay_subscription_id,razorpay_signature}=req.body;
  
  const paymentDetail={
    "razorpay_payment_id":razorpay_payment_id,
    "razorpay_subscription_id":razorpay_subscription_id,
    "razorpay_signature":razorpay_signature
  }
    const generatedSignature= crypto
    .createHmac('sha256',process.env.RAZORPAY_SECRET_ID)
     .update(`${razorpay_payment_id} | ${razorpay_subscription_id}`)
    .digest('hex')
    console.log("payments", generatedSignature ,razorpay_signature);
    if(generatedSignature==razorpay_signature){
        return res.status(500).json({
            success:false,
            message:"Payment not verify kindly try again",
        })
    }else{
      const user=await Users.findById(_id)
      if(!user){
        return res.status(400).json({
            success:false,
            message:"Please, login again"
        })
      }
     user.enrollCourses.push(id)
      user.subscription.status="Active"
      user.save()}
     return res.status(200).json({
        success:true,
        message:"Payment successfull",
       payment: paymentDetail
    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:"!try again after some time",
  })
  }
}
const createOrder=async function(req,res,next){
    const {amount}=req.body
    console.log(req.body);
  try {
    const options={
        amount:amount*100,
        currency:"INR",
        payment_capture:1,
        notes:{
            key1:"value3",
            key2:"value2"
        }
       }
       const response=await razorpayInstance.orders.create(options)
       console.log(response);
       if(!response){
        return res.status(400).json({
            success:false,
            message:"payment failed"
        })
       }
       return res.status(200).json({
        success:true,
        message:"payment successfully",response
    })
  } catch (error) {
    return res.status(400).json({
        success:false,
        message:"Not able to create order to payments",error
    })
  }
}

export {
    getrazorPayKey,
    Buysubscription,
    verifySubscription,
    createOrder,
    allPayments
     }