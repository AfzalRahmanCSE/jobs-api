const express=require('express')
const router=express.Router()
const {
    getJobs,
    newJob,
    getJob,
    updateJob,
    deleteJob,
}=require('./../controllers/jobController')

const {isUserAuthenticated}=require('../middlewares/auth')

router.route('/jobs')
.get(getJobs)

router.route('/job/:id')
.get(getJob)

router.route('/job/new')
.post(isUserAuthenticated,newJob)

router.route('/job/:id')
.patch(isUserAuthenticated,updateJob)
.delete(isUserAuthenticated,deleteJob)

module.exports=router;