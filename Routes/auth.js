const express = require('express')
const authRouter = express.Router()
const {signupValidate} = require("../utils/signupValidate")
const bcrypt = require("bcrypt")
const User = require("../models/user")

// Add user to DB
authRouter.post("/signup", async (req,res)=>{
    // Vlidate the user

    signupValidate(req)

    const {firstName,lastName,email,password} = req.body
    // Encrypt password
    const hashPassword = await bcrypt.hash(password,10)

    // Store in DB
    
    const user = new User({
        firstName,lastName,email,password:hashPassword
    })

    try{
        await user.save()
        res.send("User created succesfully")
    } catch (err){
        res.status(400).send('Unable to create user :' + err.message)
    }
})
// Login user
authRouter.post("/login",async (req,res)=>{
    try{
        const emailId = req.body.email
    const user = await User.findOne({email:emailId})
    // Check Email is correct
    if(!user){
        throw new Error("Invalid credential!!")
    }
    const {password} = req.body
    // Check password is correct
    const isPassword = await user.validatePassword(password)
    if(!isPassword){
        throw new Error("Invalid credential!!")
    }
    else{
        const token = await user.getJWT();
        res.cookie("token",token,{expires: new Date(Date.now()+7 * 24 * 60 * 60 * 1000)})
        res.send("Logged in succesfully")
    }
    }
    catch(err){
        res.status(400).send("ERROR "+ err)
    }
})

module.exports = authRouter;