const { writeData, getHistory } = require('../utils/fileStorage');
const { calculateDistribution, calculateProductivityScore, identifyOutliers } = require('../utils/calculations');
const { generateAISuggestions } = require('../ai/suggestionEngine');

exports.analyzeDay = async (req, res) => {
    try {
        const { activities, goals } = req.body;

        // --- VALIDATION ---
        const errors = [];
        if (!activities || !Array.isArray(activities) || activities.length === 0) {
            return res.status(400).json({ error: "At least one activity is required." });
        }

        let totalMinutes = 0;
        const categoryMap = {};

        activities.forEach((act, idx) => {
            if (!act.category || typeof act.category !== 'string' || act.category.trim() === '') {
                errors.push(`Row ${idx + 1}: Missing category name.`);
                return;
            }
            if (typeof act.minutes !== 'number' || isNaN(act.minutes)) {
                errors.push(`Row ${idx + 1}: Invalid minutes.`);
                return;
            }
            if (act.minutes <= 0) {
                errors.push(`Row ${idx + 1}: Minutes must be positive.`);
                return;
            }

            const cleanCat = act.category.trim();
            // Title Case
            const key = cleanCat.charAt(0).toUpperCase() + cleanCat.slice(1).toLowerCase();

            categoryMap[key] = (categoryMap[key] || 0) + act.minutes;
            totalMinutes += act.minutes;
        });

        if (errors.length > 0) {
            return res.status(400).json({ error: "Validation Failed", details: errors });
        }

        if (totalMinutes > 1440) {
            return res.status(400).json({ error: `Total minutes (${totalMinutes}) exceeds 24 hours (1440).` });
        }

        // --- COMPUTATION ---
        const distribution = calculateDistribution(categoryMap, totalMinutes);
        const outliers = identifyOutliers(distribution);

        // 1. Productivity Score (Calculated BEFORE AI)
        const productivityScore = calculateProductivityScore(distribution);

        // 2. AI Suggestions
        // Prepare context for AI
        const context = {
            overInvested: outliers.overInvested.map(c => c.category),
            neglected: outliers.neglected.map(c => c.category),
            productivityScore // giving AI score context too is helpful
        };

        const aiSuggestions = await generateAISuggestions(goals || [], context);

        const analysisResult = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            totalMinutes,
            distribution,
            overInvested: outliers.overInvested,
            neglected: outliers.neglected,
            productivityScore, // Ensure this is always sent
            suggestions: aiSuggestions, // Ensure this is always sent
            goals: goals || []
        };

        // --- PERSISTENCE ---
        writeData(analysisResult);

        return res.status(200).json(analysisResult);

    } catch (error) {
        console.error("Analysis Controller Error:", error);
        return res.status(500).json({ error: "Internal processing error." });
    }
};

exports.getHistory = (req, res) => {
    try {
        const history = getHistory();
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve history." });
    }
};

exports.getSample = (req, res) => {
    res.json({
        activities: [
            { category: "Deep Work", minutes: 300 },
            { category: "Social Media", minutes: 180 },
            { category: "Sleep", minutes: 480 },
            { category: "Gym", minutes: 60 }
        ],
        goals: ["Reduce screen time", "Build muscle"]
    });
};
