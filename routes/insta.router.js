const express = require("express")
const {instaModel} = require("../model/insta.model")
const {auth} = require("../middleware/auth.middleware")

const instaRouter = express.Router()

instaRouter.use(auth)

instaRouter.get("/",async(req,res)=>{
    try {
        const post = await instaModel.find({userID:req.body.userID})
        res.send(post)
    } catch (error) {
        res.status(400).send({err:error})
    }
})

instaRouter.post("/add",async(req,res)=>{
    try {
        const posts = new instaModel(req.body)
        await posts.save()
        res.status(200).send({msg:"A new Post is Added!",posts:req.body})
    } catch (error) {
        res.status(400).send({err:error})
    }
})

instaRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    const insta = await instaModel.findOne({_id:id})
    try {
        if(req.body.userID!==insta.userID){
            res.status(400).send({err:"Something went wrong!"})
        }
        else{
            await instaModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({msg:`${id} is Updated`})
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
})

instaRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    const insta = await instaModel.findOne({_id:id})
    try {
        if(req.body.userID!==insta.userID){
            res.status(400).send({err:"Something went wrong!"})
        }
        else{
            await instaModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:`${id} is Deleted`})
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
})

module.exports={instaRouter}