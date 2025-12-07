/**
 * Generates 3 actionable micro-change suggestions.
 */
exports.generateSmartSuggestions = (outliers, goals) => {
    const { overInvested, neglected } = outliers;
    const suggestions = [];

    // 1. Tackle Over-Investment
    overInvested.forEach(item => {
        if (suggestions.length >= 3) return;
        const cat = item.category.toLowerCase();

        if (cat.includes('social') || cat.includes('net') || cat.includes('game')) {
            suggestions.push(`High ${item.category} use detected (${item.percent}%). Try a "Digital Sunset" today: No screens after 9 PM.`);
        } else if (cat.includes('work') || cat.includes('study')) {
            suggestions.push(`You're pushing hard on ${item.category}. Remember the 52/17 rule: 52 mins work, 17 mins break.`);
        } else {
            suggestions.push(`${item.category} takes up ${item.percent}% of your day. Could you trim 15 mins to free up time?`);
        }
    });

    // 2. Boost Neglected Areas
    neglected.forEach(item => {
        if (suggestions.length >= 3) return;
        const cat = item.category.toLowerCase();

        if (cat.includes('health') || cat.includes('exer')) {
            suggestions.push(`Movement is missing! Can you do just 10 pushups or a 5-min walk now?`);
        } else if (cat.includes('read') || cat.includes('learn')) {
            suggestions.push(`Micro-habit: Read just 2 pages of a book before bed.`);
        } else {
            suggestions.push(`Try to allocate a "Power 20" session for ${item.category} tomorrow.`);
        }
    });

    // 3. Align with Goals
    if (goals && goals.length > 0 && suggestions.length < 3) {
        goals.forEach(goal => {
            if (suggestions.length >= 3) return;
            suggestions.push(`To reach "${goal}", identify one distraction to eliminate today.`);
        });
    }

    // Filler if still needed
    const fillers = [
        "Hydration Check: Drink a glass of water right now.",
        "Plan tomorrow tonight to save mental energy.",
        "Take a moment to breathe deeply for 2 minutes."
    ];
    let fIdx = 0;
    while (suggestions.length < 3) {
        suggestions.push(fillers[fIdx++ % fillers.length]);
    }

    return suggestions.slice(0, 3);
};
