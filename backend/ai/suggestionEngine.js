// Fallback suggestions generator
const getFallbackSuggestions = (goals) => {
    const primaryGoal = goals && goals.length > 0 ? goals[0] : "general wellness";
    return [
        {
            category: "Health & Well-being",
            tip: "Take a 10-minute walk outside.",
            reason: "Walking outdoors helps reset your circadian rhythm and clears mental fog, making you more productive for the next task.",
            duration: "10 minutes",
            targetGoal: primaryGoal
        },
        {
            category: "Productivity",
            tip: "Reduce 5 minutes from a high-time category.",
            reason: "Trimming just a few minutes creates a buffer in your schedule, reducing stress and giving you breathing room between tasks.",
            duration: "5 minutes",
            targetGoal: primaryGoal
        },
        {
            category: "Personal Growth",
            tip: "Add 5 minutes to a neglected category.",
            reason: "Consistent small investments in neglected areas compound over time, leading to significant long-term improvements.",
            duration: "5 minutes",
            targetGoal: primaryGoal
        }
    ];
};

exports.generateAISuggestions = async (goals, context) => {
    // 1. Immediate Fallback if no goals
    if (!goals || goals.length === 0) {
        return getFallbackSuggestions([]);
    }

    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("No API Key configured");
        }

        const SYSTEM_PROMPT = `You are a professional habit coach. Generate micro-changes (5–20 minutes) that match the user's goals. Keep suggestions realistic, simple, and highly actionable. Avoid generic advice.`;

        const userPrompt = `
User goals: ${JSON.stringify(goals)}
Daily balance context: ${JSON.stringify(context)}
Generate EXACTLY 3 micro-habit suggestions.
Each response must:
- Address at least one user goal
- Be short and realistic
- Start with an action verb
- Include a specific Category Name
- Include a separate detailed reason (2-3 sentences long) explaining WHY this helps.
Return JSON ONLY in this format:
[
  {
    "category": "string",
    "tip": "string",
    "reason": "string (2-3 sentences)",
    "duration": "string",
    "targetGoal": "string"
  }
]`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.AI_MODEL || "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.8
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Parse JSON safely
        let aiSuggestions;
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                aiSuggestions = JSON.parse(jsonMatch[0]);
            } else {
                aiSuggestions = JSON.parse(content);
            }
        } catch (e) {
            throw new Error("Failed to parse AI JSON response");
        }

        if (!Array.isArray(aiSuggestions)) {
            throw new Error("AI output is not an array");
        }

        // Ensure they have the schema
        return aiSuggestions.slice(0, 3).map(s => ({
            category: s.category || "General Advice",
            tip: s.tip || "Improve your habit",
            reason: s.reason || "This habit helps you stay consistent and aligned with your long-term objectives.",
            duration: s.duration || "5m",
            targetGoal: s.targetGoal || goals[0]
        }));

    } catch (err) {
        console.error("AI Error:", err.message);
        return getFallbackSuggestions(goals);
    }
};
