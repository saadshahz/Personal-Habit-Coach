import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Clock, Target, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const SuggestionCard = ({ suggestion, index }) => {
    let tipContent, reason, duration, targetGoal, category;

    if (typeof suggestion === 'string') {
        tipContent = suggestion;
        reason = "AI Coach Highlight";
        category = "General";
    } else {
        tipContent = suggestion.tip;
        reason = suggestion.reason;
        duration = suggestion.duration;
        targetGoal = suggestion.targetGoal;
        category = suggestion.category || "Insight";
    }

    const getIcon = (i) => {
        if (i === 0) return <Lightbulb className="w-5 h-5 text-amber-500" />;
        if (i === 1) return <AlertCircle className="w-5 h-5 text-blue-500" />;
        return <TrendingUp className="w-5 h-5 text-green-500" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col gap-4 group"
        >
            <div className="flex gap-4 items-start">
                <div className="p-2 bg-slate-50 rounded-full shrink-0 group-hover:bg-slate-100 transition-colors mt-1">
                    {getIcon(index)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                            {category}
                        </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 leading-tight">
                        {tipContent}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed border-l-2 border-slate-100 pl-3 italic">
                        {reason}
                    </p>
                </div>
            </div>

            {/* Badges for AI metadata */}
            {(duration || targetGoal) && (
                <div className="flex gap-2 ml-14">
                    {duration && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            <Clock size={10} /> {duration}
                        </span>
                    )}
                    {targetGoal && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            <Target size={10} /> {targetGoal}
                        </span>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default SuggestionCard;
