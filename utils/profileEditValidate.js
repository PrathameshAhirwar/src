const profileEditValidate = async (req,res)=>{
    try{
        const isEditAllowed = [
            "firstName",
             "lastName",
             "email",
             "photoUrl",
             "skills"
        ]

       const checkObj = Object.keys(req.body).every(key => isEditAllowed.includes(key))
       return checkObj  
    }catch(err){
        res.status(400).send("ERROR "+err)
    }
}

module.exports={profileEditValidate}