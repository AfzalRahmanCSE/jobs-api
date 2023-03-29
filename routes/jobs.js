const express=require('express')
const router=express.Router()
const {getJobs,newJob}=require('./../controllers/jobController')

router.route('/jobs').get(getJobs)
router.route('/job/new').post(newJob)

module.exports=router;