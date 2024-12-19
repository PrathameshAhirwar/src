const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Schema} = mongoose

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid' + value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password Not strong"+value)
            }
        }
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender data is not valid"+value)
            }
        }
    },
    mobile: {
        type: String,
        validate(value) {
          if (!validator.isMobilePhone(value, 'any')) {
            throw new Error(`Mobile number is invalid: ${value}`);
          }
        },
      },
    photoUrl:{
        type:String,
        default:"https://www.google.com/imgres?q=avtar%20photo&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fabstract-boy-avtar-character-fiction-260nw-2168819879.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fabstract-boy-avtar-character-fiction-person-2168819879&docid=brqA5FIngyY-XM&tbnid=aJ4xUHue6vjJqM&vet=12ahUKEwjs_K_jpa6KAxXE1TgGHawEBY0QM3oECE8QAA..i&w=271&h=280&hcb=2&ved=2ahUKEwjs_K_jpa6KAxXE1TgGHawEBY0QM3oECE8QAA",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Photo URL is invalid')
            }
        }
    },
    skills:{
        type:Array
    }
},{
    timestamps:true
})


userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},'ahir@123',{
        expiresIn:"7d"
    })
    return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isValid = await bcrypt.compare(passwordInputByUser,user.password)
    return isValid
}

const User = mongoose.model("User",userSchema)

module.exports = User;