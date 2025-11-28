const {handleLogin,handleSignup,handleLogout}=require('../controller/handleUser')
const express=require('express')
const router=express.Router()

router.post('/login',handleLogin)

router.post('/signup',handleSignup)

router.post('/logout',handleLogout)

module.exports=router