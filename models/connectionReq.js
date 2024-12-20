const mongoose = require("mongoose")

const connectionRequestSchema = mongoose.Schema({
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:["intrested","accepted","rejected","ignored"],
        required:true
    }
},{
    timestamps:true
})

// Ascending order

connectionRequestSchema.index({fromUserId:1 , toUserId:1})

module.exports = mongoose.model("connectionRequest",connectionRequestSchema);