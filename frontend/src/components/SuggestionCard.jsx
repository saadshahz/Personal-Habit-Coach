import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Clock, Target, Sparkles } from 'lucide-react';
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
        if (i === 0) return <Lightbulb className="w-5 h-5 text-yellow-400" />;
        if (i === 1) return <Sparkles className="w-5 h-5 text-purple-400" />;
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
    };

    const getGradient = (i) => {
        if (i === 0) return 'from-yellow-500/20 to-orange-500/20';
        if (i === 1) return 'from-purple-500/20 to-pink-500/20';
        return 'from-cyan-500/20 to-blue-500/20';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`bg-gradient-to-br ${getGradient(index)} backdrop-blur-xl rounded-xl p-5 shadow-lg border border-white/20 hover:shadow-glow-purple hover:border-white/40 transition-all flex flex-col gap-4 group hover:-translate-y-1`}
        >
            <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full shrink-0 group-hover:bg-white/20 transition-colors mt-1 border border-white/20">
                    {getIcon(index)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                            {category}
                        </span>
                    </div>
                    <h4 className="font-bold text-white text-base mb-2 leading-tight">
                        {tipContent}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed border-l-2 border-white/30 pl-3 italic">
                        {reason}
                    </p>
                </div>
            </div>

            {/* Badges for AI metadata */}
            {(duration || targetGoal) && (
                <div className="flex gap-2 ml-14 flex-wrap">
                    {duration && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 backdrop-blur-md text-blue-200 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-blue-500/30">
                            <Clock size={12} /> {duration}
                        </span>
                    )}
                    {targetGoal && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 backdrop-blur-md text-purple-200 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-purple-500/30">
                            <Target size={12} /> {targetGoal}
                        </span>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default SuggestionCard;
