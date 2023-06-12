const express = require("express")
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { blacklist } = require("../balcklist")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,gender,city,age,is_married} = req.body
    const user1=await userModel.findOne({email:email})
    if(user1){
        res.status(400).send({err:"User already exist, please login"})
    }
    else{
        try {
            
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(200).send({err:err.message})
                }
                else{
                    const user = new userModel({name,email,password:hash,gender,city,age,is_married})
                    await user.save()
                    res.status(200).send({msg:"User has been registered!",user:req.body})
                }
            })
        } catch (error) {
            res.status(400).send(error)
        }
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user._id,user:user.name},"insta",{
                        expiresIn:"7d"
                    })
                    res.status(200).send({msg:"Logged In", token:token})
                }
                else{
                    res.status(400).send({err:"Provide the correct password"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
})

userRouter.get("/logout",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
        blacklist.push(token)
        res.status(200).send({msg:"User has been logged out"})
    } catch (error) {
        res.status(400).send({err:error})
    }
})

module.exports={userRouter}