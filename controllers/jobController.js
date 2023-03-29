const Jobs=require('./../models/jobs')

exports.getJobs=async (req,res,next)=>{
    res.status(200).send({message:'Page Coming Soon'})
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