const express=require('express')
const router=express.Router()

const {createUser,loginuser}=require('./../controllers/authController')


router.route('/registeruser').post(createUser)
router.route('/login').post(loginuser)


module.exports=router;