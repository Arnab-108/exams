const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded = jwt.verify(token,"insta")
            if(decoded){
                console.log(decoded)
                req.body.userID = decoded.userID
                req.body.user = decoded.user
                next()
            }
            else{
                res.status(200).send({msg:"Not Authorized!"})
            }
        } catch (error) {
            res.status(400).send({err:error})
        }
    }
    else{
        res.status(400).send({msg:"Please Login First!"})
    }
}

module.exports={auth}