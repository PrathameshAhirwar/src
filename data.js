const express = require('express')
const app = express();
const {adminAuth,userAuth} = require("./middleware/adminAuth")
const port = 3005;

app.get("/admin/alluser",adminAuth,(req,res)=>{
    res.send("All data is displayed")
})

app.get("/user",userAuth,(req,res)=>{
    res.send("Hey user welcome")
})

app.get("/admin/deleteUser",adminAuth,(req,res)=>{
    res.send("User deleted")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})