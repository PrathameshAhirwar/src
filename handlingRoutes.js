const express = require('express');
const app = express();
const port = 3001;

app.use("/user1",(req,res,next)=>{
    console.log("Route handler 1");
    // res.send("Response from handler 1")
    next()
},
(req,res,next)=>{
    console.log("Route handler 2");
    // res.send("Always Handler 2 is best")
    next()
},
(req,res,next)=>{
    console.log("Route handler 3");
    // res.send("Always Handler 2 is best")
    next()
},
(req,res,next)=>{
    console.log("Route handler 4");
    // res.send("Always Handler 2 is best")
    next()
},
(req,res)=>{
    console.log("Route handler 5");
    res.send("Always Handler 5 is best")
},
)


app.listen(port,()=>{
    console.log(`App running on ${port}`)
})