const express =require('express')
const router =express.Router()
const AuthCntrl=require('../controllers/auth')
router.post('/login',AuthCntrl.login)
module.exports=router