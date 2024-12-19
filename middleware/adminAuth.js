const adminAuth = (req,res,next)=>{
    const token = "xyza";
    const isAuth = token === 'xyz';
    if(isAuth){
        next();
    }
    else{
        res.status(401).send("Unauthorized admin")
    }
}

const userAuth = (req,res,next)=>{
    const token = 'yes'
    const isAuth = token === 'yes';
    if(isAuth){
        next()
    }
    else{
        res.status(401).send("user is not authenticated")    
    }
}

module.exports={
    adminAuth,
    userAuth
}

