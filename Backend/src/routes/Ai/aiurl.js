import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message is required" });
  }

  try {
    // ⏳ 3–5 seconds delay
    const delay = Math.floor(Math.random() * 2000) + 3000; // 3000–5000 ms
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.MODEL_NAME,
        messages: [
          {
            role: "system",
            content:
              "You are a warm, empathetic AI friend. Detect the user's language automatically (Tamil, English, Hindi, Telugu, or any other). Always reply in the SAME language as the user. Reply in max 4 short sentences with friendly emojis. Be gentle, concise, and supportive. Detect the user's emotional tone (sad, stressed, happy, tired, angry). Do NOT use any markdown formatting symbols like *, #, _, ~, or ``` in your reply.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 120,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply =
      response.data.choices?.[0]?.message?.content ||
      "No response from AI 😅";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Error contacting AI 😔" });
  }
});

export default router;
