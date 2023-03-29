const User = require('./../models/users')
const {getJwtToken}=require('./../utils/helpers')
const bcrypt=require('bcrypt')

exports.createUser = async (req, res,next) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            const err = new Error('All Fields are mandatory');
        err.status = 400;
        return next(err);
        }
        hashPassword = await bcrypt.hash(password, 10)
        
        
        const user = await User.create({
            name,
            email,
            password:hashPassword,
        });

        const token = await getJwtToken(user?._id,email);
        
        
        res.status(201).json({
            token,
        });

        
    } catch (error) {
        
        
        if (error.code === 11000) {
            const err = new Error('Email Already in Use');
        err.status = 409;
        return next(err);
        
        }
        const err = new Error('Internal Server Error');
        err.status = 500;
        return next(err);
    }
}



exports.loginuser=async (req,res,next)=>{
    try{

        const {email,password}=req.body
        
        if(!email||!password){
            const err=new Error('Email and Password are Mandatory')
            err.status=400
           return next(err)
        }

        const user=await User.findOne({email})
        if(!user){
            const err=new Error('User Doesnt Exist')
            err.status(400)
            return next(err)
        }
5
        const passwordMatch=await bcrypt.compare(password,user.password)
       
        if(!passwordMatch){
            const err=new Error('Incorrect email or password')
            err.status=400;
            return next(err)
        }
        const token = await getJwtToken(user?._id,email)

        res.status(200).json({
          token,
        });
        
    }catch(error){
        const err=new Error('Internal Server Error')
        err.status=500
        next(err)
    }
}

