const app=require('./app');
const connectDatabase = require('./config/database');

const port=process.env.port;
connectDatabase();
app.listen(3000,()=>{
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} Environment`)
})