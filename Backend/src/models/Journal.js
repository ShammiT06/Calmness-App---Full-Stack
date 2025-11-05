import mongoose from "mongoose";


const journal = new mongoose.Schema({
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true

    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    emotions: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})


const Journals = mongoose.model("Journal", journal)

export default Journals