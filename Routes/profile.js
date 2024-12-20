const express = require('express')
const profileRouter = express.Router()
const User = require('../models/user')
const {userAuth} = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { profileEditValidate } = require('../utils/profileEditValidate')

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
        res.status(401).send("Unauthorized"+ err);
        return;
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        
        const isEditAllowed = await profileEditValidate(req)
        if(!isEditAllowed){
            throw new Error("Invalid request!!")
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        
        await loggedInUser.save()
        res.send("Profile edit successfully!!!")
    }catch(err){
        res.status(400).send("ERROR: "+ err );
        
    }
})

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body;
        const password = req.user.password
        // console.log(password)
        // console.log(oldPassword)
        // console.log(newPassword)
        if(newPassword.length == 0){
            throw new Error("Please Enter new password")
        }
        const isOldPasswordValid = await bcrypt.compare(oldPassword,password)
        if(!isOldPasswordValid){
            throw new Error("Please enter correct password")
        }else{
            const hashedPassword = await bcrypt.hash(newPassword,10)
        // Store new password in db
        req.user.password = hashedPassword
        // console.log(hashedPassword)
        req.user.save()
        res.send("Password Updated Successfully!!")
        }
    }catch(err){
        res.status(400).send("ERROR: "+ err )
    }
})
module.exports = profileRouter;