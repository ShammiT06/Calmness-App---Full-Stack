import mongoose from "mongoose";

const emotion = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    emotion:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Emotions = mongoose.model("Emotions",emotion)

export default Emotions