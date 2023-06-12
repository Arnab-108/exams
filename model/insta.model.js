const mongoose = require("mongoose")

const instaSchema = mongoose.Schema({
    title:{type:String,required:true},
    userID:{type:String,required:true},
    user:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_of_comments:{type:Number,required:true},
},{
    versionKey:false
})

const instaModel = mongoose.model("instagram",instaSchema)

module.exports={instaModel}