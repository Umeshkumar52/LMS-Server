import express from 'express'
import upload from '../midilewars/multerMiddilerware.js'
import isLogined from '../midilewars/isLogined.js'
import {register,login,queryData,logout,updateProfile,forgetPassword,resetPassword} from '../Controllers/AuthorController.js'
const router=express.Router()
router.post('/register',upload.single("avatar"),register)
router.post('/login',login)
router.get('/logout',logout)
router.put('/updateProfile',isLogined,upload.single("avatar"),updateProfile)
router.post('/forgetPassword',forgetPassword)
router.post('/resetPassword/:token',resetPassword)
router.post('/query',queryData)
export default router;

