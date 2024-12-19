const express = require("express")
const app = express()
const port = 3001

app.get("/user1",(req,res,next)=>{
    console.log('route handler is called')
    next()
    // res.send("response from handler 1")
})

app.get("/user1",(req,res,next)=>{
    console.log('route handler2 is called')
    // res.send("response from handler 2")
})

app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})