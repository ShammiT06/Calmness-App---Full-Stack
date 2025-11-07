export async function askAI(message) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No response from AI 😅";
    } catch (error) {
        console.error("AI Error:", error);
        return "Error contacting AI 😔";
    }
}