const express = require('express')
const profileRouter = express.Router()
const User = require('../models/user')
const {userAuth} = require('../middlewares/auth')
const jwt = require('jsonwebtoken')

profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
        const cookies = req.cookies
        const {token} = cookies
        if(!token){
            throw new Error("Please login first!!")
        }
        //Validate the token
        const decodeToken =await jwt.verify(token,"ahir@123")
        console.log(decodeToken)
        const {_id} = decodeToken
        const user = await User.findById({_id})
        if(!user){
            throw new Error("User not found!!")
        }
        res.send(user)
    }
    catch(err){
        res.status(401).send("Unauthorized"+ err)
    }
})

module.exports = profileRouter;