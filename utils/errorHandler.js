const errorHandler=(err,req,res)=>{
    if(!err.status){
        err.status=500;
    }
    res.status(err.status || 500).json({
        status: 'error',
        errorStatus:err.status,
        message: err.message
    });

}

module.exports=errorHandler