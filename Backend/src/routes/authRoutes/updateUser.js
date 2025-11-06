import express from "express"
import User from "../../models/User.js"

const router = express.Router()

router.put("/:email", async (req, res) => {
    try {
        const { email } = req.params
        const {name} = req.body
        const userFound = await User.findOneAndUpdate(
            {email:email},
            {firstName:name},
            {new:true}
        )

        if (!userFound) {
            return res.status(400).json({ message: "User Not Found" })
        }
        res.status(200).json({message:"User Updated Successfully"})
    } catch (error) {
        console.error("Error in Updating User",error)
        return res.status(500).json({message:"Internal Server Error"})

    }
})

export default router