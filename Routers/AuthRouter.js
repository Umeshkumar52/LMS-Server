import express from 'express'
import upload from '../midilewars/multerMiddilerware.js'
import isLogined from '../midilewars/isLogined.js'
import {register,login,queryData,logout,updateProfile,forgetPassword,resetPassword, querymsg} from '../Controllers/AuthorController.js'
const router=express.Router()
router.post('/register',upload.single("avatar"),register)
router.post('/login',login)
router.get('/logout',logout)
router.put('/updateProfile',isLogined,upload.single("avatar"),updateProfile)
router.post('/forgetPassword',forgetPassword)
router.post('/resetPassword/:token',resetPassword)
router.post('/query',queryData)
router.get('/querymsg',querymsg)
export default router;

