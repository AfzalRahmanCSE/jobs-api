const express=require('express')
const app=express()
const auth=require('./routes/auth')
const jobs=require('./routes/jobs')
const {NODE_ENV='development'}=process.env
const errorHandler=require('./utils/errorHandler')

require('dotenv')
.config({path:`./config/${NODE_ENV}.env`})
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200)
    res.json({status:'Up'})
})


app.use("/api/v1", require('./routes/auth'));
app.use('/api/v1', require('./routes/jobs'))

app.get('*',(req,res)=>{
    res.status(404)
    res.send('Page Not Found')
    
})

app.use((err,req,res,next)=>{
    errorHandler(err,req,res)
})

module.exports=app