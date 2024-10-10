const express=require('express');
const router=express.Router();
const User=require('../models/user');


router.post('/post',async (req,res)=>{
    try{
        const {name,password}=req.body;
        if(name==='admin' && password==='admin'){
            return res.status(200).json('welcome to the admin page')
        }
        if(!(name &&  password)){
            return res.status(200).json('please enter name and password')   
        }
        const checkUser= await User.findOne({name,password});
        if(checkUser){
            return res.status(409).json({
                message:'User already exists'
            });
        }
        const user= new User({name,password});
        await user.save();
        return res.status(201).json({
            message:'User created successfully',
            user
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:'internal server error'
        });
    }
})
module.exports=router