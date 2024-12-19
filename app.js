const express = require("express")
const app = express()
const connectDB = require('./config/database')
const cookieParser = require("cookie-parser")
const authRouter = require('./Routes/auth')
const profileRouter = require('./Routes/profile')
const requestRouter = require('./Routes/request')


const PORT = 3000

app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)





connectDB().then(()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err.message)
})


