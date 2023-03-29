const mongoose=require('mongoose')

const connectDatabase=()=>{

    mongoose.connect(process.env.MONGO_CON_STRING)
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>{
        console.log('Connection to DB not working')
    })
}
module.exports=connectDatabase;
