const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Mandatory']
    },
    email:{
        type:String,
        required:[true,'email is mandatory'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is Mandatory'],
        minlength:[8,'Password must be atleast 8 characters long']
    }
},
{timestamps:true}
)


const userModel=mongoose.model('User',userSchema)

module.exports=userModel;