import express from "express";
import Journals from "../../models/Journal.js";
import User from "../../models/User.js";
import Emotions from "../../models/Emotion.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const journals = await Journals.find({
            UserId: userId,
            date: { $gte: startDate, $lt: endDate },
        }).populate("UserId", "firstName email");

        if (journals.length === 0) {
            const latestEmotion = await Emotions.findOne({ userId: userId })
                .sort({ date: -1 })
                .select("score emotion")
                .populate("userId", "firstName email")

            if (!latestEmotion) {
                return res.status(404).json({ message: "No Journal or Emotion Data Found" });
            }

            return res.status(200).json({
                message: "No Journal found for today. Showing latest emotion instead.",
                emotionData: latestEmotion,
            });
        }
        return res.status(200).json(journals);
    } catch (error) {
        console.error("There is an error", error);
        res.status(500).json({ message: "There is an Error" });
    }
});

export default router;
