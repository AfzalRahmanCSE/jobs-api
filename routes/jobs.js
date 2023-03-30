const express=require('express')
const router=express.Router()
const {getJobs,newJob}=require('./../controllers/jobController')

const {isUserAuthenticated}=require('../middlewares/auth')

router.route('/jobs').get(isUserAuthenticated,getJobs)
router.route('/job/new').post(isUserAuthenticated,newJob)

module.exports=router;