const { GoogleGenerativeAI } = require('@google/generative-ai');

// Enhanced fallback suggestions generator - generates realistic suggestions based on context
const getFallbackSuggestions = (goals, context) => {
    const primaryGoal = goals && goals.length > 0 ? goals[0] : "general wellness";
    const suggestions = [];

    // Analyze context to provide relevant suggestions
    const hasOverInvested = context && context.overInvested && context.overInvested.length > 0;
    const hasNeglected = context && context.neglected && context.neglected.length > 0;

    // Suggestion 1: Address over-invested category if exists
    if (hasOverInvested) {
        const overCategory = context.overInvested[0];
        suggestions.push({
            category: "Time Management",
            tip: `Reduce ${overCategory} time by 15 minutes daily`,
            reason: `You're spending a significant amount of time on ${overCategory}. By reducing just 15 minutes, you can create space for other important activities while maintaining productivity. This small change helps prevent burnout and creates better work-life balance.`,
            duration: "15 minutes",
            targetGoal: primaryGoal
        });
    } else {
        suggestions.push({
            category: "Productivity",
            tip: "Use the Pomodoro Technique for focused work sessions",
            reason: "Working in 25-minute focused intervals with 5-minute breaks improves concentration and prevents mental fatigue. This technique helps you accomplish more in less time while maintaining high quality work.",
            duration: "25 minutes",
            targetGoal: primaryGoal
        });
    }

    // Suggestion 2: Address neglected category or sleep
    if (hasNeglected) {
        const neglectedCategory = context.neglected[0];
        suggestions.push({
            category: "Personal Growth",
            tip: `Add 20 minutes daily to ${neglectedCategory}`,
            reason: `${neglectedCategory} is currently getting minimal attention in your schedule. Investing just 20 minutes daily compounds over time - that's 2.3 hours per week dedicated to this important area. Small, consistent investments yield significant long-term results.`,
            duration: "20 minutes",
            targetGoal: primaryGoal
        });
    } else {
        suggestions.push({
            category: "Health & Wellness",
            tip: "Establish a consistent sleep schedule",
            reason: "Going to bed and waking up at the same time daily regulates your circadian rhythm, improving sleep quality and daytime energy. Quality sleep enhances focus, mood, and overall productivity in all areas of life.",
            duration: "30 minutes earlier",
            targetGoal: primaryGoal
        });
    }

    // Suggestion 3: Goal-specific or general wellness
    if (goals && goals.length > 0) {
        const goalLower = primaryGoal.toLowerCase();

        if (goalLower.includes('sleep') || goalLower.includes('rest')) {
            suggestions.push({
                category: "Sleep Optimization",
                tip: "Create a 30-minute wind-down routine before bed",
                reason: "A consistent pre-sleep routine signals your brain it's time to rest. Activities like reading, gentle stretching, or meditation help reduce cortisol levels and improve sleep quality, directly supporting your goal of better sleep.",
                duration: "30 minutes",
                targetGoal: primaryGoal
            });
        } else if (goalLower.includes('exercise') || goalLower.includes('fitness') || goalLower.includes('health')) {
            suggestions.push({
                category: "Physical Activity",
                tip: "Take a 15-minute walk after lunch",
                reason: "Post-meal walks aid digestion, boost energy levels, and help maintain consistent physical activity. This habit is easy to maintain and serves as a foundation for building more intensive exercise routines aligned with your fitness goals.",
                duration: "15 minutes",
                targetGoal: primaryGoal
            });
        } else if (goalLower.includes('screen') || goalLower.includes('social media') || goalLower.includes('phone')) {
            suggestions.push({
                category: "Digital Wellness",
                tip: "Implement a 'no screens 1 hour before bed' rule",
                reason: "Blue light from screens suppresses melatonin production and disrupts sleep patterns. Removing screens before bed improves sleep quality and reduces overall screen time, directly addressing your goal while enhancing rest.",
                duration: "1 hour",
                targetGoal: primaryGoal
            });
        } else if (goalLower.includes('focus') || goalLower.includes('productivity') || goalLower.includes('work')) {
            suggestions.push({
                category: "Deep Work",
                tip: "Schedule one 90-minute deep work block daily",
                reason: "Deep work sessions without interruptions produce higher quality output than fragmented work time. By protecting this focused time, you'll accomplish more meaningful work and feel greater satisfaction with your productivity.",
                duration: "90 minutes",
                targetGoal: primaryGoal
            });
        } else {
            suggestions.push({
                category: "Mindfulness",
                tip: "Practice 10 minutes of morning meditation",
                reason: "Starting your day with meditation reduces stress, improves focus, and sets a positive tone for the day. Regular practice enhances emotional regulation and decision-making, supporting progress toward your personal goals.",
                duration: "10 minutes",
                targetGoal: primaryGoal
            });
        }
    } else {
        suggestions.push({
            category: "Habit Building",
            tip: "Track one keystone habit daily",
            reason: "Keystone habits create positive ripple effects across multiple life areas. By tracking one important habit, you build self-awareness and momentum that naturally leads to improvements in other areas of your life.",
            duration: "5 minutes",
            targetGoal: "general wellness"
        });
    }

    return suggestions.slice(0, 3);
};

exports.generateAISuggestions = async (goals, context) => {
    // 1. Immediate Fallback if no goals
    if (!goals || goals.length === 0) {
        return getFallbackSuggestions([], context);
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.log("No API Key configured, using enhanced fallback suggestions");
            return getFallbackSuggestions(goals, context);
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: process.env.AI_MODEL || "gemini-1.5-flash"
        });

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

        const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

        console.log("Calling Gemini AI for suggestions...");
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const content = response.text();

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
            console.error("Failed to parse AI JSON response:", e.message);
            console.log("Using enhanced fallback suggestions instead");
            return getFallbackSuggestions(goals, context);
        }

        if (!Array.isArray(aiSuggestions)) {
            console.log("AI output is not an array, using fallback");
            return getFallbackSuggestions(goals, context);
        }

        console.log("Successfully generated AI suggestions");

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
        console.log("Using enhanced fallback suggestions");
        return getFallbackSuggestions(goals, context);
    }
};
