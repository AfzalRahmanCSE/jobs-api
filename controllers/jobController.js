const Jobs=require('./../models/jobs')
const User=require('./../models/users')

exports.getJobs=async (req,res,next)=>{
        try{
        const resPerPage=4;
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

exports.getJob=async (req,res,next)=>{
  try{
     const job=await Jobs.findById(req.params.id)
  return res.status(200).json(job)

  }catch(error){
    if(error.name==='CastError'){
      res.status(400).json({error:'Invalid Id'})
    }
  
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

exports.deleteJob=async (req,res,next)=>{
  try{
    const job=await Jobs.findById(req.params.id)

    if(!job){
      res.status(400).json({error:'No Job found'})
    }
    console.log(`job id is:${job.user}`)
    console.log(req.user._id.toString())
    if(job.user.toString()!==req.user._id.toString()){
      return res.status(403).json({error:'Unauthorized'})
    }

    const deletedJob=await Jobs.findByIdAndDelete(req.params.id)


  res.status(200).json(deletedJob)



  }catch(error){
    if(error.name==='CastError'){
      res.status(400).json({error:'Invalid Id'})
    }
  }
}