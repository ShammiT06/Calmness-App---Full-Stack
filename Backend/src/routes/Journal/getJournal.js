import express from "express"
import Journals from "../../models/Journal.js"


const router = express.Router()
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const userData = await Journals.find({
            UserId: userId
        }).select("heading description date emotions score")

        if (userData.length === 0) {
            return res.status(400).json({ message: "Something Went Wrong" })
        }
        res.status(200).json(userData)

    } catch (error) {
        console.error("Error fetching journals:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})


export default router