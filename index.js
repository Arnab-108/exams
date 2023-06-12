const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.router")
const { instaRouter } = require("./routes/insta.router")
require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("HOMEPAGE")
})
app.use("/users",userRouter)
app.use("/posts",instaRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB!")
        console.log(`Server is running at ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})