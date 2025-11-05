export async function askAI(message) {
   const OPENROUTER_API_KEY = "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"
   const  MODEL_NAME = "mistralai/mistral-small-3.2-24b-instruct"
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