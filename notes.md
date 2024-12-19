// get user by id
app.get("/user",async(req,res)=>{
    // const userEmail = req.body.email
    const userId = req.body._id
    try{
        const user = await User.findById({_id:userId})
        res.send(user)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

// Update user
app.patch("/updateUser/:userId",userAuth,async(req,res)=>{
    const userId = req.params?.userId
    const data = req.body;
    try{
        const ALLOWED_UPDATE = ["age","gender"]
        const isAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATE.includes(k)
        )
        if(!isAllowed){
            throw new Error("Update not allowed")
        }
        const user = await User.findByIdAndUpdate({_id:userId},data)
        res.send("Data is updated Succesfully"+user)
    }catch(err){
        res.status(400).send("Something went wrong"+ err)
    }
})

// get user by email
app.get("/userEmail",async (req,res)=>{
    const userEmail = req.body.email
    try{
        const user = await User.findOne({email:userEmail})
        res.send(user)
    }
    catch (err){
        res.status(400).send("Something went wrong")
    }
})


// Get all users
app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find()
        res.send(user)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

// find the id and delete the user
app.delete("/delete",async(req,res)=>{
    const userId = req.body._id
    try{
        // const user = await User.findByIdAndDelete({_id:userId})
        const user = await User.findByIdAndDelete(userId) //ShortHand
        res.send("User deleted successfully :" + user)
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// Update user by email id
app.patch("/update",async (req,res)=>{
    const userEmail = req.body.email
    const data = req.body
    try{
        const user = await User.findOneAndUpdate({email:userEmail},data)
        res.send("Data is updated Succesfully"+user)
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})