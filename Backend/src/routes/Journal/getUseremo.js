import express from "express"
import Emotions from "../../models/Emotion.js"


const router = express.Router()


router.get("/:userId", async (req,res)=>{
    try {
        const {userId}=req.params
        
        const userScore = await Emotions.find({
            userId:userId
        }).select("emotion score")
    } catch (error) {
        
    }

})





export default router