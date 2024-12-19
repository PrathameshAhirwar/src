const validator = require("validator")

const signupValidate = (req)=>{
    const {firstName,lastName,email,password} = req.body
    if(!firstName || !lastName){
        throw new Error("Fields are required")
    }
    else if(!firstName.length > 4 && !firstName.length < 50){
        throw new Error("First name must be between 4 and 50 characters")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Please enter a valid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
}

module.exports = {signupValidate}