const Jobs=require('./../models/jobs')
const User=require('./../models/users')

exports.getJobs=async (req,res,next)=>{
        try{
        const resPerPage=2;
        const currentPage=+req.query.page||1;
        const skip=resPerPage*(currentPage-1)
        
        const keyword=req.query.keyword
            ?{
               title:{
                $regex:req.query.keyword,
                $options:'i'
               }     
            }:{}

        const jobs=await Jobs.find({...keyword})
                        .populate('user','name email -_id').select('-__v ')
                        .limit(resPerPage).skip(skip)

        res.status(200).send(jobs)
    }catch(error){
        res.status(500)
        res.send("Internal Server error")
    }
}

exports.newJob=async (req,res,next)=>{
    try{
        const job = await Jobs.create(req.body);

    res.status(200).json({
      job,
    });
    }catch (error) {
        if (error.name === "ValidationError") {
          res.status(400).json({
            error: "Please enter all values",
          });
        }
      }

}