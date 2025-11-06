import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ reply: "Message is required" });

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: process.env.MODEL_NAME,
                messages: [{ role: "user", content: message }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data.choices[0])

        const aiReply = response.data.choices?.[0]?.message?.content || "No response from AI 😅";
        res.json({ reply: aiReply });
    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        res.status(500).json({ reply: "Error contacting AI 😔" });
    }
});

export default router;
