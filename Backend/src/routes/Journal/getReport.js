import express from "express"
import Journals from "../../models/Journal.js"
import User from "../../models/User.js";


const router = express.Router()

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)
        const journals = await Journals.find({
            UserId: userId,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate("UserId", "firstName email");

        if (journals.length == 0) {
            return res.status(500).json({ message: "No Journal for Today" })
        }

        res.status(200).json(journals)
    } catch (error) {
        console.error("There is an error", error)
        res.status(500).json({ message: "There is an Error" })


    }

})

export default router