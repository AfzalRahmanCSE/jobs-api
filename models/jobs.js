const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is mandatory'],
        trim:true,
        maxlength:[100,'Job title should not exceed 100 characters']
    },
    description:{
        type:String,
        required:[true,'Job Description is mandatory']
    },
    email:{
        type:String,
        required:[true,'email is mandatory']
    },
    address:{
        type:String,
        required:[true,'Address is mandatory']
    },
    company:{
        type:String,
        required:[true,'Company is mandatory']
    },
    industry:{
        type:String,
        required:[true,'Industry is mandatory'],
        enum:{
            values:[
                "Business",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecommunication",
        "Others",
            ],
            message: "Please select correct options for industry.",
        }
    },
    positions:{
        type:Number,
        default:1
    },
    salary:{
        type:Number,
        required:[true,'mention expected salary for this job']
    },
    postingDate:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})


const jobModel=mongoose.model('Job',jobSchema)

module.exports=jobModel;




// {
//     "title":"Backend Engineer",
//     "description":"One who has in-depth knowledge of NodeJs or Springboot or PHP",
//     "email":"employer1@gmail.com",
//     "address":"23 Main St.",
//     "company":"ABC pvt.ltd",
//     "industry":"Information Technology",
//     "positions":3,
//     "salary":3000000,
//     "user":"642415e2356e54a4a8e2df86"
 
 
//  }
     
 