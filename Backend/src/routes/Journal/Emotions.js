import express from "express"
import Emotions from "../../models/Emotion.js"


const router = express.Router()

router.post("/",async (req,res)=>{
    try {
        const {emotions,userId}=req.body
        console.log(userId,emotions)
        if(!emotions || !userId)
        {
            return res.status(400).json("All Fields are required")
        }
        let score = 0

        switch(emotions)
        {
            case "Happy":
                score = 100
                break
            case "Normal":
                score=80
                break
            case "UnHappy":
                score=60
                break
            case "Angry":
                score=40
                break
            case "Sad":
                score=20 
                break           
        }


        const emotion = new Emotions({emotion:emotions,userId:userId,score:score})
        await emotion.save()

        res.status(200).json({message:"Journal Saved Successfully"})


    } catch (error) {
        console.error("There is an Error",error)
        res.status(404).json({message:"Something Went Wrong"})
        
    }
})








export default router