const mongoose = require('mongoose')

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://prathameshahirwar2000:ahirwar2000@prathameshnode.dvgke.mongodb.net/devTinder"
    )
}

module.exports = connectDB;