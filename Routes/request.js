const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const jwt = require("jsonwebtoken")

requestRouter.post("/sendConnection",userAuth,async(req,res)=>{
    const {token} = req.cookies
    const decoded =await jwt.verify(token,"ahir@123")
    const {_id} = decoded;
    const {firstName} =await User.findById({_id})
    res.send(firstName+" has sent request")
})


module.exports = requestRouter;